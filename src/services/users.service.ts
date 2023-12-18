import { datasource } from '../db/datasource'
import { User, SportsClass } from '../entities'
import { UserSportsClassRepository } from '../repositories'
import { UserErrorMessages } from '../global/errors.enum'
import { MAX_NUMBER_OF_ENROLLMENTS } from '../global/consts'

class UsersService {
  private static readonly Errors = UserErrorMessages
  static async enroll(userId: number, classId: number): Promise<string> {
    let newEnrollment

    await datasource.transaction(async (transactionalEntityManager) => {
      const existingUser =
        await UserSportsClassRepository.findUserByIdWithEnrollments(
          userId,
          transactionalEntityManager,
        )
      const existingSportsClass =
        await UserSportsClassRepository.findSportsClassByIdWithEnrollments(
          classId,
          transactionalEntityManager,
        )

      if (!existingUser) throw new Error(this.Errors.UserNotFound)
      if (!existingSportsClass) throw new Error(this.Errors.ClassNotFound)

      this.validateEnrollment(existingUser, existingSportsClass)

      const isEnrolled = await UserSportsClassRepository.findEnrollment(
        existingUser,
        existingSportsClass,
        transactionalEntityManager,
      )

      if (isEnrolled) {
        throw new Error(this.Errors.AlreadyEnrolled)
      }

      newEnrollment = UserSportsClassRepository.create({
        user: existingUser,
        sportsClass: existingSportsClass,
      })

      await transactionalEntityManager.save(newEnrollment)
    })

    return 'User enrolled with success'
  }

  static async unenroll(userId: number, classId: number): Promise<string> {
    await datasource.transaction(async (transactionalEntityManager) => {
      const existingUser = await transactionalEntityManager.findOne(User, {
        where: { id: userId },
      })
      const existingSportsClass = await transactionalEntityManager.findOne(
        SportsClass,
        {
          where: { id: classId },
        },
      )

      this.validateEnrollment(existingUser, existingSportsClass)

      if (!existingUser) throw new Error(this.Errors.UserNotFound)
      if (!existingSportsClass) throw new Error(this.Errors.ClassNotFound)

      const enrollment = await UserSportsClassRepository.findEnrollment(
        existingUser,
        existingSportsClass,
        transactionalEntityManager,
      )

      if (!enrollment) throw new Error(this.Errors.NotEnrolled)

      await transactionalEntityManager.remove(enrollment)
    })

    return 'User is unenrolled'
  }

  private static validateEnrollment(
    existingUser: User | null,
    existingSportsClass: SportsClass | null,
  ): void {
    if (!existingUser) {
      throw new Error(this.Errors.UserNotFound)
    }

    if (!existingSportsClass) {
      throw new Error(this.Errors.ClassNotFound)
    }

    const enrollmentsCount = existingSportsClass.enrollments.length
    const userEnrollmentsCount = existingUser.enrollments.length

    if (enrollmentsCount >= existingSportsClass.maxCapacity) {
      throw new Error(this.Errors.ClassCannotEnroll)
    }

    if (userEnrollmentsCount >= MAX_NUMBER_OF_ENROLLMENTS) {
      throw new Error(this.Errors.UserCannotEnroll)
    }
  }
}

export default UsersService

import { datasource } from '../db/datasource'
import { User, SportsClass, UserSportsClassEnrollment } from '../entities'
import { UserSportsClassRepository } from '../repositories'
import { UserErrorMessages } from '../global/errors.enum'
import { MAX_NUMBER_OF_ENROLLMENTS } from '../global/consts'

class UsersService {
  private static readonly Errors = UserErrorMessages
  static async enroll(userId: number, classId: number): Promise<string> {
    let newEnrollment

    await datasource.transaction(async (transactionalEntityManager) => {
      const existingUser = await transactionalEntityManager.findOne(User, {
        where: { id: userId },
        relations: ['enrollments'],
      })
      const existingSportsClass = await transactionalEntityManager.findOne(
        SportsClass,
        {
          where: { id: classId },
        },
      )
      if (!existingUser) throw new Error(this.Errors.UserNotFound)
      if (!existingSportsClass) throw new Error(this.Errors.ClassNotFound)

      const enrollmentsCount = existingUser.enrollments.length

      if (enrollmentsCount >= MAX_NUMBER_OF_ENROLLMENTS)
        throw new Error(this.Errors.CannotEnroll)

      const isEnrolled = await transactionalEntityManager.findOne(
        UserSportsClassEnrollment,
        {
          where: {
            user: { id: existingUser.id },
            sportsClass: { id: existingSportsClass.id },
          },
        },
      )

      if (isEnrolled) throw new Error(this.Errors.AlreadyEnrolled)

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
      if (!existingUser) throw new Error(this.Errors.UserNotFound)
      if (!existingSportsClass) throw new Error(this.Errors.ClassNotFound)

      const enrollment = await transactionalEntityManager.findOne(
        UserSportsClassEnrollment,
        {
          where: {
            user: { id: existingUser.id },
            sportsClass: { id: existingSportsClass.id },
          },
        },
      )

      if (!enrollment) throw new Error(this.Errors.NotEnrolled)

      await transactionalEntityManager.remove(enrollment)
    })

    return 'User is unenrolled'
  }
}

export default UsersService

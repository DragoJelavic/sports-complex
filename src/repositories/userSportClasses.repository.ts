import { EntityManager } from 'typeorm'
import { datasource } from '../db/datasource'
import { SportsClass, User, UserSportsClassEnrollment } from '../entities'

export const UserSportsClassRepository = datasource
  .getRepository(UserSportsClassEnrollment)
  .extend({
    async findUserByIdWithEnrollments(
      userId: number,
      transactionalEntityManager: EntityManager,
    ): Promise<User | null> {
      return await transactionalEntityManager.findOne(User, {
        where: { id: userId },
        relations: ['enrollments'],
      })
    },

    async findSportsClassByIdWithEnrollments(
      classId: number,
      transactionalEntityManager: EntityManager,
    ): Promise<SportsClass | null> {
      return await transactionalEntityManager.findOne(SportsClass, {
        where: { id: classId },
        relations: ['enrollments'],
      })
    },

    async findEnrollment(
      user: User,
      sportsClass: SportsClass,
      transactionalEntityManager: EntityManager,
    ): Promise<UserSportsClassEnrollment | null> {
      return await transactionalEntityManager.findOne(
        UserSportsClassEnrollment,
        {
          where: {
            user: { id: user.id },
            sportsClass: { id: sportsClass.id },
          },
        },
      )
    },
  })

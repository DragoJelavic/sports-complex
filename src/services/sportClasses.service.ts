import { Between } from 'typeorm'
import {
  CreateClassSchema,
  UpdateClassSchema,
  ICreateClass,
  IUpdateClass,
  IClassFilterParams,
} from '../schemas/sportClasses.schema'
import { SportsClassRepository } from '../repositories'
import {
  CommonErrorMessages,
  SportClassesErrorMessages,
} from '../global/errors.enum'
import { ZodError } from 'zod'
import { getDayOfWeek, formatTime } from '../utils/common'
import { Sport, AgeGroup, SportsClass } from '../entities'
import { datasource } from '../db/datasource'

class SportClassesService {
  private static readonly Errors = SportClassesErrorMessages
  private static readonly CommonErrors = CommonErrorMessages

  static async createClass(classData: ICreateClass): Promise<string> {
    try {
      CreateClassSchema.parse(classData)
    } catch (error) {
      throw new Error((error as ZodError).issues[0].message)
    }

    const { sportId, ageGroupId, startTime, endTime } = classData

    let newClass

    await datasource.transaction(async (transactionalEntityManager) => {
      const sport = await transactionalEntityManager.findOne(Sport, {
        where: { id: sportId },
      })
      const ageGroup = await transactionalEntityManager.findOne(AgeGroup, {
        where: { id: ageGroupId },
      })

      if (!sport) throw new Error(this.CommonErrors.SportNotFound)
      if (!ageGroup) throw new Error(this.CommonErrors.AgeGroupNotFound)

      const existingClass = await transactionalEntityManager.findOne(
        SportsClass,
        {
          where: {
            sport,
            ageGroup,
            startTime: Between(startTime, endTime),
          },
        },
      )

      if (existingClass) {
        throw new Error(this.Errors.SimilarClassExists)
      }

      if (startTime >= endTime) {
        throw new Error(this.Errors.StartTimeAfterEndTime)
      }

      const startHour = new Date(classData.startTime)
      const endHour = new Date(classData.endTime)
      const dayOfWeek = getDayOfWeek(startTime)
      const durationInMinutes = Math.floor(
        (endHour.getTime() - startHour.getTime()) / (1000 * 60),
      )

      newClass = transactionalEntityManager.create(SportsClass, {
        sport,
        ageGroup,
        startTime,
        endTime,
        maxCapacity: classData.maxCapacity,
        dayOfWeek,
        startHour: formatTime(startHour),
        endHour: formatTime(endHour),
        duration: durationInMinutes,
        description: classData.description,
      })

      await transactionalEntityManager.save(newClass)
    })

    return 'Sports class created successfully'
  }

  static async updateClass(
    classId: number,
    classData: IUpdateClass,
  ): Promise<string> {
    try {
      UpdateClassSchema.parse(classData)
    } catch (error) {
      throw new Error((error as ZodError).issues[0].message)
    }

    const existingClass = await SportsClassRepository.findOne({
      where: { id: classId },
    })
    if (!existingClass) {
      throw new Error(this.CommonErrors.ClassNotFound)
    }

    try {
      Object.assign(existingClass, classData)
      await SportsClassRepository.save(existingClass)
    } catch (error) {
      throw new Error(this.Errors.UpdateFailedError)
    }

    return 'Sports class updated successfully'
  }

  static async getClasses(filterParams: IClassFilterParams) {
    const { sports, age } = filterParams

    let query = SportsClassRepository.createQueryBuilder('sports_class')
      .leftJoinAndSelect('sports_class.sport', 'sport')
      .leftJoinAndSelect('sports_class.ageGroup', 'ageGroup')

    if (sports.length > 0) {
      query = query.where('sport.name IN (:...sports)', { sports })
    }

    if (age) {
      query = query.andWhere('ageGroup.name = :age', { age })
    }

    const classes = await query.getMany()
    return classes
  }
}

export default SportClassesService

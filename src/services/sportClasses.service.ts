import {
  SportsClassRepository,
  SportsRepository,
  AgeGroupRepository,
} from '../repositories/'
import {
  CreateClassSchema,
  UpdateClassSchema,
  ICreateClass,
  IUpdateClass,
  IClassFilterParams,
} from '../schemas/sportClasses.schema'
import { SportClassesErrorMessages } from '../global/errors.enum'
import { ZodError } from 'zod'
import { Between } from 'typeorm'
import { getDayOfWeek, formatTime } from '../utils/common'

class SportClassesService {
  private static readonly Errors = SportClassesErrorMessages

  static async createClass(classData: ICreateClass): Promise<string> {
    try {
      CreateClassSchema.parse(classData)
    } catch (error) {
      throw new Error((error as ZodError).issues[0].message)
    }

    const { sportId, ageGroupId, startTime, endTime } = classData

    const sport = await SportsRepository.findOne({ where: { id: sportId } })
    const ageGroup = await AgeGroupRepository.findOne({
      where: { id: ageGroupId },
    })

    if (!sport) throw new Error(this.Errors.SportNotFound)
    if (!ageGroup) throw new Error(this.Errors.AgeGroupNotFound)

    const existingClass = await SportsClassRepository.findOne({
      where: {
        sport,
        ageGroup,
        startTime: Between(startTime, endTime),
      },
    })

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

    const newClass = SportsClassRepository.create({
      sport: sport,
      ageGroup: ageGroup,
      startTime,
      endTime,
      maxCapacity: classData.maxCapacity,
      dayOfWeek: dayOfWeek,
      startHour: formatTime(startHour),
      endHour: formatTime(endHour),
      duration: durationInMinutes,
      description: classData.description,
    })

    await SportsClassRepository.save(newClass)

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
      throw new Error(this.Errors.ClassNotFound)
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

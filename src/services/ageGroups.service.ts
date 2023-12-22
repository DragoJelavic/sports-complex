import { AgeGroupRepository } from '../repositories/ageGroups.repository'
import { AgeGroupErrorMessages } from '../global/errors.enum'

class AgeGroupService {
  private static readonly Errors = AgeGroupErrorMessages

  static async getAgeGroups(): Promise<string | string[]> {
    const ageGroups = (await AgeGroupRepository.find()).map(
      (group) => group.name,
    )

    if (!ageGroups) throw new Error(this.Errors.NotFound)

    return ageGroups
  }

  static async createAgeGroup(name: string): Promise<string> {
    const existingAgeGroup = await AgeGroupRepository.findByName(name)

    if (existingAgeGroup) throw new Error(this.Errors.AgeGroupExistsError)

    try {
      const newAgeGroup = await AgeGroupRepository.create({ name })
      await AgeGroupRepository.save(newAgeGroup)
    } catch (error) {
      throw new Error(this.Errors.AgeGroupCreationError)
    }

    return `Age group ${name} created`
  }

  static async updateAgeGroup(id: number, name: string): Promise<string> {
    const existingAgeGroup = await AgeGroupRepository.findOne({ where: { id } })

    if (!existingAgeGroup) throw new Error(this.Errors.NoAgeGroupByIdError)

    const newAgeGroup = await AgeGroupRepository.findByName(name)

    if (newAgeGroup) throw new Error(this.Errors.AgeGroupExistsError)

    existingAgeGroup.name = name

    try {
      await AgeGroupRepository.save(existingAgeGroup)
    } catch (error) {
      throw new Error(this.Errors.AgeGroupCreationError)
    }

    return `Age group updated`
  }
}

export default AgeGroupService

import { SportsRepository } from '../repositories/sports.repository'
import { CommonErrorMessages, SportErrorMessages } from '../global/errors.enum'

class SportsService {
  private static readonly Errors = SportErrorMessages
  private static readonly CommonErrors = CommonErrorMessages

  static async getSports(): Promise<string | string[]> {
    const sports = (await SportsRepository.find()).map((sport) => sport.name)

    if (!sports) throw new Error(this.Errors.NotFound)

    return sports
  }

  static async createSport(name: string): Promise<string> {
    const existingSport = await SportsRepository.findByName(name)

    if (existingSport) throw new Error(this.Errors.SportNameExistsError)

    try {
      const newSport = await SportsRepository.create({ name })
      await SportsRepository.save(newSport)
    } catch (error) {
      throw new Error(this.Errors.SportCreationError)
    }

    return `Sport ${name} created`
  }

  static async updateSport(id: number, name: string): Promise<string> {
    const existingSport = await SportsRepository.findOne({ where: { id } })

    if (!existingSport) throw new Error(this.CommonErrors.SportNotFound)

    const newSportName = await SportsRepository.findByName(name)

    if (newSportName) throw new Error(this.Errors.SportNameExistsError)

    existingSport.name = name

    try {
      await SportsRepository.save(existingSport)
    } catch (error) {
      throw new Error(this.Errors.SportCreationError)
    }

    return `Sport name updated`
  }
}

export default SportsService

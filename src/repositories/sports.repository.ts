import { datasource } from '../db/datasource'
import { Sport } from '../entities/Sport.entity'

export const SportsRepository = datasource.getRepository(Sport).extend({
  async findByName(name: string): Promise<Sport | null> {
    return await this.findOne({ where: { name } })
  },
})

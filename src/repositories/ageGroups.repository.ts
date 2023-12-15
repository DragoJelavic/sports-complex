import { datasource } from '../db/datasource'
import { AgeGroup } from '../entities/AgeGroup.entity'

export const AgeGroupRepository = datasource.getRepository(AgeGroup).extend({
  async findByName(name: string): Promise<AgeGroup | null> {
    return await this.findOne({ where: { name } })
  },
})

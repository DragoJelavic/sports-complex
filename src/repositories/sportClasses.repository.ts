import { datasource } from '../db/datasource'
import { SportsClass } from '../entities/SportsClass.entity'

export const SportsClassRepository = datasource.getRepository(SportsClass)

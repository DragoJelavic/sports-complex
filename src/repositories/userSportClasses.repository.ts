import { datasource } from '../db/datasource'
import { UserSportsClassEnrollment } from '../entities'

export const UserSportsClassRepository = datasource.getRepository(
  UserSportsClassEnrollment,
)

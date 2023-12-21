import { datasource } from '../db/datasource'
import { Comment } from '../entities/'

export const CommentsRepository = datasource.getRepository(Comment)

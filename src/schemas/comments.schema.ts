import { z } from 'zod'

export const AddCommentSchema = z.object({
  userId: z.number(),
  rating: z.number().int().min(1).max(10),
  commentText: z.string().min(10).max(100),
  isAnonymous: z.boolean().optional(),
})

export const UpdateCommentSchema = z.object({
  rating: z.number().int().min(1).max(10).optional(),
  commentText: z.string().min(10).max(100).optional(),
})

export interface IAddComment {
  userId: number
  rating: number
  commentText: string
  isAnonymous?: boolean
}

export interface IUpdateComment {
  rating?: number
  commentText?: string
}

export interface ICommentDetails {
  id: number
  commentText: string
  rating: number
  isAnonymous: boolean
  userEmail?: string
}

export interface ICommentWithClassInfo {
  className: string
  averageRating: number
  ageGroup: string
  comments: ICommentDetails[]
}

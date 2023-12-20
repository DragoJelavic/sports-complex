import { Request, Response } from 'express'
import { sendErrorResponse } from '../utils/errorHandler'
import { ZodError } from 'zod'
import CommentsService from '../services/comments.service'
import {
  IAddComment,
  AddCommentSchema,
  IUpdateComment,
  UpdateCommentSchema,
} from '../schemas/comments.schema'

class CommentsController {
  static async createComment(req: Request, res: Response) {
    const { userId, rating, commentText, isAnonymous }: IAddComment = req.body
    const { classId } = req.params

    try {
      AddCommentSchema.parse({
        userId,
        rating,
        commentText,
        isAnonymous,
      })
      const message = await CommentsService.addComment(
        userId,
        Number(classId),
        rating,
        commentText,
        isAnonymous,
      )
      return res.status(201).json({ message })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ success: false, message: error.issues[0].message })
      }
      return sendErrorResponse(res, 500, (error as Error).message)
    }
  }

  static async updateComment(req: Request, res: Response) {
    const commentData: IUpdateComment = req.body
    const { rating, commentText, isAnonymous } = commentData
    const { commentId } = req.params
    try {
      UpdateCommentSchema.parse(commentData)
      const message = await CommentsService.updateComment(
        Number(commentId),
        rating,
        commentText,
        isAnonymous,
      )
      return res.status(201).json({ message })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ success: false, message: error.issues[0].message })
      }
      return sendErrorResponse(res, 500, (error as Error).message)
    }
  }

  static async deleteComment(req: Request, res: Response) {
    const { commentId } = req.params
    try {
      const message = await CommentsService.deleteComment(Number(commentId))
      return res.status(201).json({ message })
    } catch (error) {
      return sendErrorResponse(res, 500, (error as Error).message)
    }
  }
}

export default CommentsController

import { Request, Response } from 'express'
import { handleError } from '../utils/errorHandler'
import CommentsService from '../services/comments.service'
import {
  IAddComment,
  AddCommentSchema,
  IUpdateComment,
  UpdateCommentSchema,
} from '../schemas/comments.schema'

class CommentsController {
  static async getClassComments(req: Request, res: Response) {
    const { classId } = req.params
    try {
      const comments = await CommentsService.getComments(Number(classId))
      res.render('comments', { comments })
    } catch (error) {
      return handleError(res, error)
    }
  }

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
      return handleError(res, error)
    }
  }

  static async updateComment(req: Request, res: Response) {
    const commentData: IUpdateComment = req.body
    const { rating, commentText } = commentData
    const { commentId } = req.params
    try {
      UpdateCommentSchema.parse(commentData)
      const message = await CommentsService.updateComment(
        Number(commentId),
        rating,
        commentText,
      )
      return res.status(201).json({ message })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async deleteComment(req: Request, res: Response) {
    const { commentId } = req.params
    try {
      const message = await CommentsService.deleteComment(Number(commentId))
      return res.status(201).json({ message })
    } catch (error) {
      return handleError(res, error)
    }
  }
}

export default CommentsController

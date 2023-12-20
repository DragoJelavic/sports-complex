import { SportsClass, User } from '../entities'
import { CommentErrorMessages } from '../global/errors.enum'
import { SportsClassRepository } from '../repositories'
import { CommentsRepository } from '../repositories/comments.repository'
import { Comment } from '../entities'
import { datasource } from '../db/datasource'

class CommentsService {
  private static readonly Errors = CommentErrorMessages

  static async addComment(
    userId: number,
    classId: number,
    rating: number,
    commentText: string,
    isAnonymous: boolean = true,
  ): Promise<string> {
    await datasource.transaction(async (transactionalEntityManager) => {
      const user = await transactionalEntityManager.findOne(User, {
        where: { id: userId },
      })
      const sportsClass = await transactionalEntityManager.findOne(
        SportsClass,
        {
          where: { id: classId },
        },
      )

      if (!user) throw new Error('User not found')
      if (!sportsClass) throw new Error('Sport class not found')

      const newComment = transactionalEntityManager.create(Comment, {
        user,
        sportsClass,
        rating,
        commentText,
        isAnonymous,
      })

      await transactionalEntityManager.save(newComment)
      await this.updateAverageRating(sportsClass)
    })

    return 'Comment added successfully'
  }

  static async updateComment(
    commentId: number,
    rating?: number,
    commentText?: string,
    isAnonymous?: boolean,
  ): Promise<string> {
    const updatedComment = await CommentsRepository.findOne({
      where: { id: commentId },
      relations: ['sportsClass'],
    })

    if (!updatedComment) {
      throw new Error('Comment not found')
    }

    if (rating !== undefined) {
      updatedComment.rating = rating
    }
    if (commentText !== undefined) {
      updatedComment.commentText = commentText
    }
    if (isAnonymous !== undefined) {
      updatedComment.isAnonymous = isAnonymous
    }

    await CommentsRepository.save(updatedComment)
    await this.updateAverageRating(updatedComment.sportsClass)

    return 'Comment updated successfully'
  }

  static async deleteComment(commentId: number): Promise<string> {
    const comment = await CommentsRepository.findOne({
      where: { id: commentId },
      relations: ['sportsClass'],
    })

    if (!comment) {
      throw new Error('Comment not found')
    }

    await CommentsRepository.remove(comment)
    await this.updateAverageRating(comment.sportsClass)

    return 'Comment deleted successfully'
  }

  static async updateAverageRating(sportsClass: SportsClass) {
    const comments = await CommentsRepository.find({
      where: { sportsClass: { id: sportsClass.id } },
    })

    const totalRatings = comments.reduce(
      (sum: number, comment: Comment) => sum + (comment.rating || 0),
      0,
    )

    sportsClass.averageRating =
      comments.length > 0 ? totalRatings / comments.length : 0

    await SportsClassRepository.save(sportsClass)
  }
}

export default CommentsService

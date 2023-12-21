import express from 'express'
import CommentsController from '../controllers/comments.controller'
import { checkToken, isAdmin, isVerified } from '../middlewares'

const router = express.Router()

router.get(
  '/:classId',
  checkToken,
  isAdmin,
  CommentsController.getClassComments,
)
router.post(
  '/create/:classId',
  checkToken,
  isVerified,
  CommentsController.createComment,
)
router.patch(
  '/update/:commentId',
  checkToken,
  isVerified,
  CommentsController.updateComment,
)
router.delete(
  '/delete/:commentId',
  checkToken,
  isVerified,
  CommentsController.deleteComment,
)

export default router

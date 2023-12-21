import express from 'express'
import CommentsController from '../controllers/comments.controller'

const router = express.Router()

router.get('/:classId', CommentsController.getClassComments)
router.post('/create/:classId', CommentsController.createComment)
router.patch('/update/:commentId', CommentsController.updateComment)
router.delete('/delete/:commentId', CommentsController.deleteComment)

export default router

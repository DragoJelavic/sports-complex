import express from 'express'
import UsersController from '../controllers/users.controller'
import { checkToken, isVerified } from '../middlewares'

const router = express.Router()

router.post(
  '/enrollments/:userId/:classId',
  checkToken,
  isVerified,
  UsersController.enroll,
)
router.delete(
  '/enrollments/:userId/:classId',
  checkToken,
  isVerified,
  UsersController.unenroll,
)

export default router

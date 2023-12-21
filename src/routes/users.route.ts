import express from 'express'
import UsersController from '../controllers/users.controller'
import { checkToken, isAdmin, isVerified } from '../middlewares'

const router = express.Router()
router.get('', checkToken, isAdmin, UsersController.getUsers)
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

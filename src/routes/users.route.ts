import express from 'express'
import UsersController from '../controllers/users.controller'

const router = express.Router()

router.post('/enrollments/:userId/:classId', UsersController.enroll)
router.delete('/enrollments/:userId/:classId', UsersController.unenroll)

export default router

import express from 'express'
import UsersController from '../controllers/users.controller'
import { checkToken, isAdmin, isVerified } from '../middlewares'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - Admin only
 *     responses:
 *       '200':
 *         description: Successful operation
 */

router.get('', checkToken, isAdmin, UsersController.getUsers)

/**
 * @swagger
 * /users/enrollments/{userId}/{classId}:
 *   post:
 *     summary: Enroll a user in a class
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - Verified users only
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '201':
 *         description: User enrolled successfully
 */

router.post(
  '/enrollments/:userId/:classId',
  checkToken,
  isVerified,
  UsersController.enroll,
)

/**
 * @swagger
 * /users/enrollments/{userId}/{classId}:
 *   delete:
 *     summary: Unenroll a user from a class
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - Verified users only
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User unenrolled successfully
 */

router.delete(
  '/enrollments/:userId/:classId',
  checkToken,
  isVerified,
  UsersController.unenroll,
)

export default router

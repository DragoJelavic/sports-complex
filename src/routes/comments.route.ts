import express from 'express'
import CommentsController from '../controllers/comments.controller'
import { checkToken, isAdmin, isVerified } from '../middlewares'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

/**
 * @swagger
 * /comments/{classId}:
 *   get:
 *     summary: Get comments for a specific class
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *       - Admin only
 *     responses:
 *       '200':
 *         description: Successful operation
 */

router.get(
  '/:classId',
  checkToken,
  isAdmin,
  CommentsController.getClassComments,
)

/**
 * @swagger
 * /comments/create/{classId}:
 *   post:
 *     summary: Create a new comment for a class
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *       - Verified only
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               commentText:
 *                 type: string
 *               isAnonymous:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Comment created successfully
 */

router.post(
  '/create/:classId',
  checkToken,
  isVerified,
  CommentsController.createComment,
)

/**
 * @swagger
 * /comments/update/{commentId}:
 *   patch:
 *     summary: Update a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *       - Verified only
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               commentText:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Comment updated successfully
 */

router.patch(
  '/update/:commentId',
  checkToken,
  isVerified,
  CommentsController.updateComment,
)

/**
 * @swagger
 * /comments/delete/{commentId}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *       - Verified only
 *     responses:
 *       '201':
 *         description: Comment deleted successfully
 */

router.delete(
  '/delete/:commentId',
  checkToken,
  isVerified,
  CommentsController.deleteComment,
)

export default router

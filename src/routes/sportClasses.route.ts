import express from 'express'
import SportClassesController from '../controllers/sportClasses.controller'
import { checkToken, isAdmin, isVerified } from '../middlewares'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Sport Classes
 *   description: API endpoints for managing sport classes
 */

/**
 * @swagger
 * /sport-classes/create:
 *   post:
 *     summary: Create a new sport class
 *     tags: [Sport Classes]
 *     security:
 *       - bearerAuth: []
 *       - Admin only
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Sport class created successfully
 */

router.post('/create', checkToken, isAdmin, SportClassesController.createClass)

/**
 * @swagger
 * /sport-classes/{id}/update:
 *   patch:
 *     summary: Update a sport class by ID
 *     tags: [Sport Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *       - Admin only
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Sport class updated successfully
 */

router.patch(
  '/:id/update',
  checkToken,
  isAdmin,
  SportClassesController.updateClass,
)

/**
 * @swagger
 * /sport-classes:
 *   get:
 *     summary: Get all sport classes
 *     tags: [Sport Classes]
 *     security:
 *       - bearerAuth: []
 *       - Verified only
 *     responses:
 *       '200':
 *         description: Successful operation
 */

router.get('/', checkToken, isVerified, SportClassesController.getClasses)

/**
 * @swagger
 * /sports-classes/delete/{id}:
 *   delete:
 *     summary: Delete a sports class by ID
 *     tags: [Sports Classes]
 *     security:
 *       - bearerAuth: []
 *       - Admin only
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Sports class deleted successfully
 *       '404':
 *         description: Sports class not found
 *       '500':
 *         description: Internal server error
 */

router.delete(
  '/delete/:id',
  checkToken,
  isAdmin,
  SportClassesController.deleteClass,
)

export default router

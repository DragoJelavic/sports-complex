import express from 'express'
import SportsController from '../controllers/sports.controller'
import { checkToken, isAdmin } from '../middlewares'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Sports
 *   description: API endpoints for managing sports
 */

/**
 * @swagger
 * /sports:
 *   get:
 *     summary: Get all sports
 *     tags: [Sports]
 *     security:
 *       - bearerAuth: []
 *       - Admin only
 *     responses:
 *       '200':
 *         description: Successful operation
 */

router.get('', checkToken, isAdmin, SportsController.getSports)

/**
 * @swagger
 * /sports/create:
 *   post:
 *     summary: Create a new sport
 *     tags: [Sports]
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
 *         description: Sport created successfully
 */

router.post('/create', checkToken, isAdmin, SportsController.createSport)

/**
 * @swagger
 * /sports/{id}/update:
 *   patch:
 *     summary: Update a sport by ID
 *     tags: [Sports]
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
 *         description: Sport updated successfully
 */

router.patch('/:id/update', checkToken, isAdmin, SportsController.updateSport)

/**
 * @swagger
 * /sports/delete/{id}:
 *   delete:
 *     summary: Delete a Sport by ID
 *     tags: [Sports]
 *     security:
 *       - bearerAuth: []
 *       - Admin only
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Sport ID
 *     responses:
 *       '200':
 *         description: Sport deleted successfully
 *       '404':
 *         description: Sport not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/delete/:id', SportsController.deleteSport)

export default router

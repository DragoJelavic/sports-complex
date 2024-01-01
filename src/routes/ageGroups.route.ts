import express from 'express'
import AgeGroupController from '../controllers/ageGroup.controller'
import { checkToken, isAdmin } from '../middlewares'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Age Groups
 *   description: API endpoints for managing age groups
 */

/**
 * @swagger
 * /age-groups:
 *   get:
 *     summary: Get all age groups
 *     tags: [Age Groups]
 *     security:
 *        - bearerAuth: []
 *        - Admin only: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Age groups not found
 *       '500':
 *         description: Internal server error
 */

router.get('', checkToken, isAdmin, AgeGroupController.getAgeGroups)

/**
 * @swagger
 * /age-groups/create:
 *   post:
 *     summary: Create a new age group
 *     tags: [Age Groups]
 *     security:
 *        - bearerAuth: []
 *        - Admin only: []
 *     parameters:
 *       - in: body
 *         name: Age group
 *         description: Age group to created
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Age group created successfully
 *       '400':
 *         description: Schema validation errors
 *       '500':
 *         description: Internal server error
 */
router.post('/create', checkToken, isAdmin, AgeGroupController.createAgeGroup)

/**
 * @swagger
 * /age-groups/update/{id}:
 *   patch:
 *     summary: Update the name of an Age group by ID
 *     tags: [Age Groups]
 *     security:
 *        - bearerAuth: []
 *        - Admin only: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Age group ID
 *     responses:
 *        '201':
 *         description: Age group name updated successfully
 *        '400':
 *         description: Schema validation errors
 *        '500':
 *         description: Internal server error
 */
router.patch(
  '/update/:id',
  checkToken,
  isAdmin,
  AgeGroupController.updateAgeGroup,
)

/**
 * @swagger
 * /age-groups/delete/{id}:
 *   delete:
 *     summary: Delete an Age group by ID
 *     tags: [Age Groups]
 *     security:
 *        - bearerAuth: []
 *        - Admin only: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           description: Age group ID
 *     responses:
 *        '200':
 *         description: Age group deleted successfully
 *        '404':
 *         description: Age group not found
 *        '500':
 *         description: Internal server error
 */
router.delete(
  '/delete/:id',
  checkToken,
  isAdmin,
  AgeGroupController.deleteAgeGroup,
)

export default router

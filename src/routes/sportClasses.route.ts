import express from 'express'
import SportClassesController from '../controllers/sportClasses.controller'
import { checkToken, isAdmin, isVerified } from '../middlewares'

const router = express.Router()

router.post('/create', checkToken, isAdmin, SportClassesController.createClass)
router.patch(
  '/:id/update',
  checkToken,
  isAdmin,
  SportClassesController.updateClass,
)
router.get('/', checkToken, isVerified, SportClassesController.getClasses)

export default router

import express from 'express'
import AgeGroupController from '../controllers/ageGroup.controller'
import { checkToken, isAdmin } from '../middlewares'

const router = express.Router()

router.get('', checkToken, isAdmin, AgeGroupController.getAgeGroups)
router.post('/create', checkToken, isAdmin, AgeGroupController.createAgeGroup)
router.patch(
  '/:id/update',
  checkToken,
  isAdmin,
  AgeGroupController.updateAgeGroup,
)

export default router

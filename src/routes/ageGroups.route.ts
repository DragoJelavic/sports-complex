import express from 'express'
import AgeGroupController from '../controllers/ageGroup.controller'

const router = express.Router()

router.post('/create', AgeGroupController.createAgeGroup)
router.patch('/:id/update', AgeGroupController.updateAgeGroup)

export default router

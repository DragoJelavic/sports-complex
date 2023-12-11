import express from 'express'
import SportsController from '../controllers/sports.controller'

const router = express.Router()

router.post('/create', SportsController.createSport)
router.patch('/:id/update', SportsController.updateSport)

export default router

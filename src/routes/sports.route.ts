import express from 'express'
import SportsController from '../controllers/sports.controller'
import { checkToken, isAdmin } from '../middlewares'

const router = express.Router()

router.post('/create', checkToken, isAdmin, SportsController.createSport)
router.patch('/:id/update', checkToken, isAdmin, SportsController.updateSport)

export default router

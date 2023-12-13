import express from 'express'
import SportClassesController from '../controllers/sportClasses.controller'

const router = express.Router()

router.post('/create', SportClassesController.createClass)
router.patch('/:id/update', SportClassesController.updateClass)
router.get('/', SportClassesController.getClasses)

export default router

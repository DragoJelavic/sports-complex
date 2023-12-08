import express from 'express'
import AuthController from '../controllers/auth.controller'

const router = express.Router()

router.post('/register', AuthController.register)
router.get('/verify', AuthController.verify)

export default router

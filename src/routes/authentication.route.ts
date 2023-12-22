import express from 'express'
import AuthController from '../controllers/auth.controller'

const router = express.Router()
/**
 * @swagger
 * tags:
 *   name: Authentication/authorization endpoints
 *   description: API endpoints for authentication/authorization
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Authentication/authorization endpoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered
 *       '400':
 *         description: Schema validation error
 *       '500':
 *         description: Internal server error
 */

router.post('/register', AuthController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in
 *     tags: [Authentication/authorization endpoints]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User logged in
 *       '400':
 *         description: Schema validation error
 *       '500':
 *         description: Internal server error
 */

router.post('/login', AuthController.login)

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify a user
 *     tags: [Authentication/authorization endpoints]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: User verified
 *       '500':
 *         description: Internal server error
 */

router.get('/verify', AuthController.verify)

export default router

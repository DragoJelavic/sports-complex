import { Request, Response } from 'express'
import { AuthErrorMessages } from '../global/errors.enum'
import { handleError, sendErrorResponse } from '../utils/errorHandler'
import { CreateUserSchema, LoginSchema } from '../schemas/user.schema'

import AuthService from '../services/auth.service'

class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password, role } = req.body

    try {
      CreateUserSchema.parse({ email, password, role })
    } catch (error) {
      return handleError(res, error)
    }

    try {
      const message = await AuthService.createUser(email, password, role)
      return res.status(201).json(message)
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async verify(req: Request, res: Response) {
    const { token } = req.query

    if (!token || typeof token !== 'string') {
      return sendErrorResponse(res, 400, AuthErrorMessages.InvalidToken)
    }

    try {
      const message = await AuthService.verifyUserByToken(token)
      return res.status(200).json({ message })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      LoginSchema.parse({ email, password })
      const token = await AuthService.loginUser(email, password, res)
      return res.status(200).json({ token })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      // Clear the access_token cookie
      res.clearCookie('access_token')

      return res.status(200).json({ message: 'User logged out successfully' })
    } catch (error) {
      return handleError(res, error)
    }
  }
}

export default AuthController

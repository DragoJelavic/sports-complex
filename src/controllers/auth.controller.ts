import { Request, Response } from 'express'
import { ZodError } from 'zod'
import { AuthErrorMessages } from '../global/errors.enum'
import { sendErrorResponse } from '../utils/errorHandler'
import { CreateUserSchema, LoginSchema } from '../schemas/user.schema'

import AuthService from '../services/auth.service'

class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password, role } = req.body

    try {
      CreateUserSchema.parse({ email, password, role })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ success: false, message: error.issues[0].message })
      }

      return sendErrorResponse(res, 400, (error as Error).message)
    }

    try {
      const message = await AuthService.createUser(email, password, role)
      return res.status(201).json(message)
    } catch (error) {
      return sendErrorResponse(res, 500, (error as Error).message)
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
      return sendErrorResponse(res, 400, (error as Error).message)
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      LoginSchema.parse({ email, password })
      const token = await AuthService.loginUser(email, password)
      return res.status(200).json({ token })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ success: false, message: error.issues[0].message })
      }

      return sendErrorResponse(res, 400, (error as Error).message)
    }
  }
}

export default AuthController

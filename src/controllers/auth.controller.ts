import { Request, Response } from 'express'
import { CreateUserSchema } from '../schemas/user.schema'

import AuthService from '../services/auth.service'

class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password, role } = req.body

    try {
      CreateUserSchema.parse({ email, password, role })
    } catch (error) {
      return res.status(400).json(error)
    }

    try {
      const message = await AuthService.createUser(email, password, role)
      return res.status(201).json(message)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
}

export default AuthController

import { Request, Response } from 'express'
import { handleError } from '../utils/errorHandler'
import UsersService from '../services/users.service'

class UsersController {
  static async enroll(req: Request, res: Response) {
    const { userId, classId } = req.params

    try {
      const message = await UsersService.enroll(Number(userId), Number(classId))
      return res.status(201).json(message)
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async unenroll(req: Request, res: Response) {
    const { userId, classId } = req.params

    try {
      const message = await UsersService.unenroll(
        Number(userId),
        Number(classId),
      )
      return res.status(201).json(message)
    } catch (error) {
      return handleError(res, error)
    }
  }
}

export default UsersController

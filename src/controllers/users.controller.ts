import { Request, Response } from 'express'
import { handleError } from '../utils/errorHandler'
import UsersService from '../services/users.service'

class UsersController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UsersService.getUsers()
      return res.status(200).json({ users })
    } catch (error) {
      handleError(res, error, 404)
    }
  }

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

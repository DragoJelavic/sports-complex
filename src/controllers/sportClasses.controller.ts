import { Request, Response } from 'express'
import SportClassesService from '../services/sportClasses.service'
import { ZodError } from 'zod'
import { ICreateClass } from '../schemas/sportClasses.schema'
import { sendErrorResponse } from '../utils/errorHandler'

class SportClassesController {
  static async createClass(req: Request, res: Response) {
    const classData: ICreateClass = req.body

    try {
      const message = await SportClassesService.createClass(classData)
      return res.status(201).json({ message })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ success: false, message: error.issues[0].message })
      }

      return sendErrorResponse(res, 500, (error as Error).message)
    }
  }

  static async updateClass(req: Request, res: Response) {
    const classId = Number(req.params.id)
    const classData = req.body

    try {
      const message = await SportClassesService.updateClass(classId, classData)
      return res.status(200).json({ message })
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ success: false, message: error.issues[0].message })
      }

      return sendErrorResponse(res, 500, (error as Error).message)
    }
  }
}

export default SportClassesController

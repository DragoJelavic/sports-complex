import { Request, Response } from 'express'
import SportsService from '../services/sports.service'
import { CreateSportSchema, UpdateNameSchema } from '../schemas/sports.schema'
import { sendErrorResponse } from '../utils/errorHandler'
import { ZodError } from 'zod'

class SportsController {
  static async createSport(req: Request, res: Response) {
    const { name } = req.body

    try {
      CreateSportSchema.parse(name)
      const message = await SportsService.createSport(name)
      return res.status(201).json(message)
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ success: false, message: error.issues[0].message })
      }
      return sendErrorResponse(res, 500, (error as Error).message)
    }
  }

  static async updateSport(req: Request, res: Response) {
    const sportId = Number(req.params.id)
    const { name } = req.body

    try {
      UpdateNameSchema.parse(name)
      const message = await SportsService.updateSport(sportId, name)
      return res.status(201).json(message)
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

export default SportsController

import { Request, Response } from 'express'
import SportsService from '../services/sports.service'
import { CreateSportSchema, UpdateNameSchema } from '../schemas/sports.schema'
import { handleError } from '../utils/errorHandler'

class SportsController {
  static async getSports(req: Request, res: Response) {
    try {
      const sports = await SportsService.getSports()
      return res.status(200).json({ sports })
    } catch (error) {
      handleError(res, error, 404)
    }
  }

  static async createSport(req: Request, res: Response) {
    const { name } = req.body

    try {
      CreateSportSchema.parse(name)
      const message = await SportsService.createSport(name.toLowerCase())
      return res.status(201).json(message)
    } catch (error) {
      return handleError(res, error)
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
      return handleError(res, error)
    }
  }

  static async deleteSport(req: Request, res: Response) {
    const sportId = Number(req.params.id)

    try {
      const message = await SportsService.deleteSport(sportId)
      return res.status(200).json(message)
    } catch (error) {
      return handleError(res, error)
    }
  }
}

export default SportsController

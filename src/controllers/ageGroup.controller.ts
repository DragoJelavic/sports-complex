import { Request, Response } from 'express'
import AgeGroupService from '../services/ageGroup.service'
import {
  CreateAgeGroupSchema,
  UpdateAgeGroupSchema,
} from '../schemas/ageGroup.schema'
import { sendErrorResponse } from '../utils/errorHandler'
import { ZodError } from 'zod'

class AgeGroupController {
  static async createAgeGroup(req: Request, res: Response) {
    const { name } = req.body

    try {
      CreateAgeGroupSchema.parse(name)
      const message = await AgeGroupService.createAgeGroup(name)
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

  static async updateAgeGroup(req: Request, res: Response) {
    const ageGroupId = Number(req.params.id)
    const { name } = req.body

    try {
      UpdateAgeGroupSchema.parse(name)
      const message = await AgeGroupService.updateAgeGroup(ageGroupId, name)
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

export default AgeGroupController

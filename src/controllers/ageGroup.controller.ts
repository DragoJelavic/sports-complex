import { Request, Response } from 'express'
import AgeGroupService from '../services/ageGroups.service'
import {
  CreateAgeGroupSchema,
  UpdateAgeGroupSchema,
} from '../schemas/ageGroup.schema'
import { handleError } from '../utils/errorHandler'

class AgeGroupController {
  static async getAgeGroups(req: Request, res: Response) {
    try {
      const ageGroups = await AgeGroupService.getAgeGroups()
      return res.status(200).json({ ageGroups })
    } catch (error) {
      handleError(res, error)
    }
  }

  static async createAgeGroup(req: Request, res: Response) {
    const { name } = req.body

    try {
      CreateAgeGroupSchema.parse(name)
      const message = await AgeGroupService.createAgeGroup(name)
      return res.status(201).json(message)
    } catch (error) {
      return handleError(res, error)
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
      return handleError(res, error)
    }
  }
}

export default AgeGroupController

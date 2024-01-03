import { Request, Response } from 'express'
import SportClassesService from '../services/sportClasses.service'
import { ICreateClass } from '../schemas/sportClasses.schema'
import { handleError } from '../utils/errorHandler'

class SportClassesController {
  static async createClass(req: Request, res: Response) {
    const classData: ICreateClass = req.body

    try {
      const message = await SportClassesService.createClass(classData)
      return res.status(201).json({ message })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async updateClass(req: Request, res: Response) {
    const classId = Number(req.params.id)
    const classData = req.body

    try {
      const message = await SportClassesService.updateClass(classId, classData)
      return res.status(201).json({ message })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async getClasses(req: Request, res: Response) {
    const { sports, age } = req.query

    try {
      const filteredClasses = await SportClassesService.getClasses({
        sports: sports ? String(sports).split(',') : [],
        age: age ? String(age) : undefined,
      })

      res.render('classes', { classes: filteredClasses })
    } catch (error) {
      return handleError(res, error)
    }
  }

  static async deleteClass(req: Request, res: Response) {
    const classId = Number(req.params.id)

    try {
      const message = await SportClassesService.deleteClass(classId)
      return res.status(200).json({ message })
    } catch (error) {
      return handleError(res, error)
    }
  }
}

export default SportClassesController

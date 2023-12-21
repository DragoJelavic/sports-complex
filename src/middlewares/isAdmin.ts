import { Request, Response, NextFunction } from 'express'
import { AuthErrorMessages } from '../global/errors.enum'

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: AuthErrorMessages.AccessDeniedAdmin })
    return
  }
  next()
}

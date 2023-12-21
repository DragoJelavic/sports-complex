import { Request, Response, NextFunction } from 'express'
import { AuthErrorMessages } from '../global/errors.enum'

export const isVerified = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user || !req.user.isVerified) {
    res.status(403).json({ message: AuthErrorMessages.AccessDeniedNotVerified })
    return
  }
  next()
}

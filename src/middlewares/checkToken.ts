import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthErrorMessages } from '../global/errors.enum'

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: AuthErrorMessages.InvalidToken })
    return
  }

  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    res.status(401).json({ message: AuthErrorMessages.JwtSecretNotSet })
    return
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload
    req.user = decoded.user
    next()
  } catch (error) {
    res
      .status(401)
      .json({ message: AuthErrorMessages.InvalidTokenUnauthorized })
  }
}

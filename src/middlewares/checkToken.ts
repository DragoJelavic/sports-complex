import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { AuthErrorMessages } from '../global/errors.enum'

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let token = req.headers.authorization?.split(' ')[1]

  // If the token is not in the header, check the cookies
  if (!token && req.cookies && req.cookies.access_token) {
    token = req.cookies.access_token
  }

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

    // Set the token in the cookie for subsequent requests
    res.cookie('access_token', token, {
      httpOnly: true,
    })

    next()
  } catch (error) {
    res
      .status(401)
      .json({ message: AuthErrorMessages.InvalidTokenUnauthorized })
  }
}

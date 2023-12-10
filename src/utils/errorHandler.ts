import { Response } from 'express'

export function sendErrorResponse(
  res: Response,
  statusCode: number,
  errorMessage: string,
) {
  return res.status(statusCode).json({ error: errorMessage })
}

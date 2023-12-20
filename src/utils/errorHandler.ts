import { ZodError } from 'zod'
import { Response } from 'express'

export const handleError = (
  res: Response,
  error?: unknown,
  message?: string,
): void => {
  if (error instanceof ZodError) {
    res.status(400).json({ success: false, message: error.issues[0].message })
  } else {
    res.status(500).json({ error: message })
  }
}

export function sendErrorResponse(
  res: Response,
  statusCode: number,
  errorMessage: string,
) {
  return res.status(statusCode).json({ error: errorMessage })
}

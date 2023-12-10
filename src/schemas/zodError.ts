import { ZodError } from 'zod'

export function formatZodError(error: ZodError) {
  return error.errors.map((err) => {
    const field = err.path.join('.')
    return {
      field,
      message: err.message,
    }
  })
}

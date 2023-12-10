import { z } from 'zod'
import { UserRole } from '../enums/UserRole'

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/

const BaseUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6)
    .refine((val) => passwordRegex.test(val), {
      message:
        'Password must be at least 6 characters long with at least 1 uppercase letter and 1 digit',
    }),
})

export const CreateUserSchema = BaseUserSchema.merge(
  z.object({
    role: z.nativeEnum(UserRole).optional(),
  }),
)

export const LoginSchema = BaseUserSchema

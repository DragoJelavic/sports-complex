import { z } from 'zod'
import { UserRole } from '../enums/UserRole'

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
  role: z.nativeEnum(UserRole).optional(),
})

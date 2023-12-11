import { z } from 'zod'

const sportNameRegex = /^[A-Z][a-z]+$/

export const CreateAgeGroupSchema = z
  .string()
  .refine((val) => sportNameRegex.test(val), {
    message: 'Name must be uppercase',
  })

export const UpdateAgeGroupSchema = CreateAgeGroupSchema

import { z } from 'zod'

export const CreateClassSchema = z.object({
  sportId: z.number(),
  ageGroupId: z.number(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  maxCapacity: z.number().int().min(1).max(10),
})

export const UpdateClassSchema = z.object({
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
  maxCapacity: z.number().int().min(1).max(10).optional(),
})

export interface IUpdateClass {
  startTime?: Date
  endTime?: Date
  maxCapacity?: number
}

export interface ICreateClass {
  sportId: number
  ageGroupId: number
  startTime: Date
  endTime: Date
  maxCapacity: number
}

export interface IClassFilterParams {
  sports: string[]
  age?: string
}

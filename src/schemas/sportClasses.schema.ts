import { z } from 'zod'

export const CreateClassSchema = z.object({
  sportId: z.number(),
  ageGroupId: z.number(),
  startTime: z.date(),
  endTime: z.date(),
  maxCapacity: z.number().int().min(1).max(10),
})

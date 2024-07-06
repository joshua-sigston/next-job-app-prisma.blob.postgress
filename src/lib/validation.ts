import {z} from 'zod'

export const filtersSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional()
})

export type jobFilterValues = z.infer<typeof filtersSchema>
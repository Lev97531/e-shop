import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { z } from 'zod'

export const productEditSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  priceCents: z.number().int().nonnegative('Price must be >= 0'),
  isAvailable: z.boolean().default(false),
  isOnSale: z.boolean().default(false),
  isNew: z.boolean().default(false),
})


import type { Prisma } from 'prisma'

export type Product = Prisma.ProductGetPayload<{ include: { attributes: true } }>

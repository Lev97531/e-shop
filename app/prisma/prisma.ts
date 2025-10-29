import { PrismaClient } from './generated/client'
export type { Prisma } from './generated/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// const logOptions = { log: ['query', 'error', 'warn', 'info'] }
const logOptions = {}
export const prisma = globalForPrisma.prisma || new PrismaClient(logOptions)

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

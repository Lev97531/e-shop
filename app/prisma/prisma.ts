import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from './generated/client'
export type { Prisma } from './generated/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

function createClient() {
  const url = process.env.DATABASE_URL
  const adapter = new PrismaBetterSqlite3({ url })
  return new PrismaClient({ adapter })
}

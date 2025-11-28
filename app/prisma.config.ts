import { defineConfig, env } from 'prisma/config'
import 'dotenv/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node --import ./prisma/resolve.ts prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})

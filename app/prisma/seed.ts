import { prisma } from './prisma'
import { seedProducts } from './seed-products'

try {
  console.log('Seeding database...')
  console.group()

  await seedProducts()

  console.groupEnd()
  console.log('Seeding complete.')
} catch (error) {
  console.groupEnd()
  console.error(error)
} finally {
  await prisma.$disconnect()
}

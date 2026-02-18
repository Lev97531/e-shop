import { prisma } from './prisma'
import { seedProducts } from './seed-products'
import { seedUsers } from './seed-users'

try {
  console.log('Seeding database...')
  console.group()

  await seedProducts()
  await seedUsers()

  console.groupEnd()
  console.log('Seeding complete.')
} catch (error) {
  console.groupEnd()
  console.error(error)
} finally {
  await prisma.$disconnect()
}

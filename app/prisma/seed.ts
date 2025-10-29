import { prisma } from './prisma'
import { seedCategories } from './seed-categories'
import { seedItems } from './seed-items'
import { seedUsers } from './seed-users'
import pc from 'picocolors'

try {
  console.log('Seeding database...')
  console.group()

  await seedUsers()
  await seedCategories()
  await seedItems()

  console.groupEnd()
  console.log('Seeding complete.')
} catch (error) {
  console.groupEnd()
  console.error(pc.red(error))
} finally {
  await prisma.$disconnect()
}

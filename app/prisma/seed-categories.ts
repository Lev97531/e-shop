import pc from 'picocolors'
import { prisma } from './prisma'

export const seedCategories = async () => {
  if (await prisma.category.count()) {
    console.log(pc.yellow('- skipping categories'))
    return
  }

  await prisma.category.create({
    data: {
      id: 1,
      name: 'Phones',
      children: {
        create: [
          { id: 2, name: 'Android' },
          { id: 3, name: 'IOS' },
        ],
      },
    },
  })

  console.log(pc.green('- seeded categories'))
}

import pc from 'picocolors'
import { prisma } from './prisma'

export const seedItems = async () => {
  if (await prisma.item.count()) {
    console.log(pc.yellow('- skipping items'))
    return
  }

  await prisma.item.createMany({
    data: [
      {
        id: 1,
        name: 'Samsung A52',
        price: 1,
        categoryId: 2,
      },
      {
        id: 2,
        name: 'Iphone 16',
        price: 9999999,
        categoryId: 3,
      },
      {
        id: 3,
        name: 'Samsung A52',
        price: 13,
        categoryId: null,
      },
    ],
  })

  console.log(pc.green('- seeded items'))
}

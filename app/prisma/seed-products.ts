import { prisma } from './prisma'

export const seedProducts = async () => {
  if (await prisma.product.count()) {
    console.log('- skipping items')
    return
  }

  await prisma.product.createMany({
    data: [
      {
        id: 1,
        name: 'Samsung A52',
        priceCents: 1,
      },
      {
        id: 2,
        name: 'Iphone 16',
        priceCents: 9999999,
      },
      {
        id: 3,
        name: 'Samsung A52',
        priceCents: 13,
      },
    ],
  })

  console.log('- seeded items')
}

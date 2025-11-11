import { prisma } from './prisma'

export const seedProducts = async () => {
  if (await prisma.product.count()) {
    console.log('- skipping items')
    return
  }

  await prisma.product.createMany({
    data: [
      { id: 1, name: 'Samsung Galaxy A52 128 GB', priceCents: 3_290_00 },
      { id: 2, name: 'Apple iPhone 16 128 GB', priceCents: 18_188_00 },
      { id: 3, name: 'Samsung Galaxy A52s 5G 128 GB', priceCents: 4_190_00 },
      { id: 4, name: 'Apple iPhone 16 Plus 128 GB', priceCents: 21_778_00 },
      { id: 5, name: 'Apple iPhone 16 Pro 128 GB', priceCents: 27_191_00 },
    ],
  })

  console.log('- seeded items')
}

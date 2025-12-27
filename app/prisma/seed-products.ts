import { prisma } from './prisma'
import { toDataURL } from './to-data-url'

export const seedProducts = async () => {
  if (await prisma.product.count()) {
    console.log('- skipping items')
    return
  }

  await prisma.product.createMany({
    data: [
      {
        id: 1,
        slug: 'samsung-galaxy-a52-128gb',
        name: 'Samsung Galaxy A52 128 GB',
        priceCents: 3_290_00,
        description:
          'A mid-range smartphone featuring a 6.5-inch Super AMOLED display, quad camera system, and long-lasting 4500 mAh battery. Offers smooth performance for everyday use with 128 GB storage.',
        imageUrl: await toDataURL('Samsung Galaxy A52.jpg'),
      },
      {
        id: 2,
        slug: 'apple-iphone-16-128gb',
        name: 'Apple iPhone 16 128 GB',
        priceCents: 18_188_00,
        description:
          'Apple’s latest generation iPhone with an advanced dual-camera system, A18 chip for exceptional speed, and a bright HDR display. Sleek design and excellent battery life in a compact package.',
        imageUrl: await toDataURL('Apple iPhone 16.jpg'),
      },
      {
        id: 3,
        slug: 'samsung-galaxy-a52s-5g-128gb',
        name: 'Samsung Galaxy A52s 5G 128 GB',
        priceCents: 4_190_00,
        description:
          'An upgraded version of the Galaxy A52 with 5G support, Snapdragon 778G processor, and a 120 Hz Super AMOLED display. Ideal for gaming, streaming, and fast connectivity.',
        imageUrl: await toDataURL('Samsung Galaxy A52s.jpg'),
      },
      {
        id: 4,
        slug: 'apple-iphone-16-plus-128gb',
        name: 'Apple iPhone 16 Plus 128 GB',
        priceCents: 21_778_00,
        description:
          'A larger version of the iPhone 16 featuring a 6.7-inch HDR display, improved battery life, and powerful A18 performance. Perfect for media consumption and productivity.',
        imageUrl: await toDataURL('Apple iPhone 16 Plus.jpg'),
      },
      {
        id: 5,
        slug: 'apple-iphone-16-pro-128gb',
        name: 'Apple iPhone 16 Pro 128 GB',
        priceCents: 27_191_00,
        description:
          'A premium flagship with a titanium frame, ProMotion display, and cutting-edge triple-camera system. Powered by the A18 Pro chip for top-tier performance and advanced photography.',
      },
    ],
  })

  console.log('- seeded items')
}

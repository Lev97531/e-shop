import { prisma } from './prisma'
import { toDataURL } from './to-data-url'

export const seedProducts = async () => {
  if (await prisma.product.count()) {
    console.log('- skipping items')
    return
  }

  await prisma.product.create({
    data: {
      slug: 'classic-logo-cap',
      name: 'Classic Logo Cap',
      priceCents: 1999,
      description: 'Minimalist cotton cap with embroidered logo.',
      imageUrl: await toDataURL('Classic Logo Cap.jpg'),
      attributes: {
        create: {
          category: 'Hats',
          color: 'Black',
          size: 'One Size',
          rating: 4,
          isNew: true,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'winter-beanie',
      name: 'Winter Beanie',
      priceCents: 1499,
      description: 'Warm knitted beanie for cold weather.',
      imageUrl: await toDataURL('Winter Beanie.jpg'),
      attributes: {
        create: {
          category: 'Hats',
          color: 'Grey',
          size: 'One Size',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'basic-white-tshirt',
      name: 'Basic White T-Shirt',
      priceCents: 2499,
      description: 'Premium cotton t-shirt with relaxed fit.',
      imageUrl: await toDataURL('Basic White T-Shirt.jpg'),
      attributes: {
        create: {
          category: 'T-Shirt',
          color: 'White',
          size: 'M',
          rating: 5,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'graphic-street-tee',
      name: 'Graphic Street Tee',
      priceCents: 2999,
      description: 'Streetwear t-shirt with bold graphic print.',
      imageUrl: await toDataURL('Graphic Street Tee.jpg'),
      attributes: {
        create: {
          category: 'T-Shirt',
          color: 'Black',
          size: 'L',
          isOnSale: true,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'oversized-vintage-tee',
      name: 'Oversized Vintage Tee',
      priceCents: 2799,
      description: 'Oversized t-shirt inspired by vintage fashion.',
      imageUrl: await toDataURL('Oversized Vintage Tee.jpg'),
      attributes: {
        create: {
          category: 'T-Shirt',
          color: 'Beige',
          size: 'XL',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'basic-hoodie',
      name: 'Basic Hoodie',
      priceCents: 4999,
      description: 'Comfortable hoodie with soft fleece interior.',
      imageUrl: await toDataURL('Basic Hoodie.jpg'),
      attributes: {
        create: {
          category: 'Hoodie',
          color: 'Grey',
          size: 'L',
          rating: 5,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'zip-up-hoodie',
      name: 'Zip-Up Hoodie',
      priceCents: 5499,
      description: 'Full-zip hoodie for everyday wear.',
      imageUrl: await toDataURL('Zip-Up Hoodie.jpg'),
      attributes: {
        create: {
          category: 'Hoodie',
          color: 'Black',
          size: 'M',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'slim-fit-jeans',
      name: 'Slim Fit Jeans',
      priceCents: 5999,
      description: 'Stretch denim jeans with slim fit cut.',
      imageUrl: await toDataURL('Slim Fit Jeans.jpg'),
      attributes: {
        create: {
          category: 'Pants',
          color: 'Dark Blue',
          size: '32',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'cargo-pants',
      name: 'Cargo Pants',
      priceCents: 6499,
      description: 'Utility cargo pants with multiple pockets.',
      imageUrl: await toDataURL('Cargo Pants.jpg'),
      attributes: {
        create: {
          category: 'Pants',
          color: 'Olive',
          size: '34',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'casual-summer-shorts',
      name: 'Casual Summer Shorts',
      priceCents: 2999,
      description: 'Lightweight shorts ideal for summer days.',
      imageUrl: await toDataURL('Casual Summer Shorts.jpg'),
      attributes: {
        create: {
          category: 'Shorts',
          color: 'Khaki',
          size: 'M',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'sport-shorts',
      name: 'Sport Shorts',
      priceCents: 2499,
      description: 'Breathable shorts for training and running.',
      imageUrl: await toDataURL('Sport Shorts.jpg'),
      attributes: {
        create: {
          category: 'Shorts',
          color: 'Black',
          size: 'L',
          isOnSale: true,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'classic-sneakers',
      name: 'Classic Sneakers',
      priceCents: 7999,
      description: 'Timeless low-top sneakers with rubber sole.',
      imageUrl: await toDataURL('Classic Sneakers.jpg'),
      attributes: {
        create: {
          category: 'Shoes',
          color: 'White',
          size: '42',
          rating: 5,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'running-shoes',
      name: 'Running Shoes',
      priceCents: 8999,
      description: 'Lightweight running shoes with cushioned sole.',
      imageUrl: await toDataURL('Running Shoes.jpg'),
      attributes: {
        create: {
          category: 'Shoes',
          color: 'Black/Red',
          size: '43',
        },
      },
    },
  })

   await prisma.product.create({
     data: {
       slug: 'canvas-belt',
       name: 'Canvas Belt',
       priceCents: 1699,
       description: 'Durable canvas belt with metal buckle.',
       attributes: {
         create: {
           category: 'Accessories',
           color: 'Black',
           size: 'One Size',
         },
       },
     },
   })
}

console.log('- seeded items')

import { prisma } from './prisma'
import { toDataURL } from './to-data-url'

export const seedProducts = async () => {
  if (await prisma.product.count()) {
    console.log('- skipping products')
    return
  }

  await prisma.product.create({
    data: {
      slug: 'klasicka-cepice-s-logem',
      name: 'Klasická čepice s logem',
      priceCents: 19900,
      description: 'Minimalistická bavlněná čepice s vyšívaným logem.',
      imageUrl: await toDataURL('Classic Logo Cap.jpg'),
      attributes: {
        create: {
          category: 'Čepice',
          color: 'Černá',
          size: 'M',
          rating: 4,
          isNew: true,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'zimni-cepice',
      name: 'Zimní čepice',
      priceCents: 14900,
      description: 'Teplá pletená čepice na chladné počasí.',
      imageUrl: await toDataURL('Winter Beanie.jpg'),
      attributes: {
        create: {
          category: 'Čepice',
          color: 'Šedá',
          size: 'M',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'zakladni-bile-tricko',
      name: 'Základní bílé tričko',
      priceCents: 24900,
      description: 'Prémiové bavlněné tričko s volným střihem.',
      imageUrl: await toDataURL('Basic White T-Shirt.jpg'),
      attributes: {
        create: {
          category: 'Trička',
          color: 'Bílá',
          size: 'M',
          rating: 5,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'graficke-ulicni-tricko',
      name: 'Grafické uliční tričko',
      priceCents: 29900,
      description: 'Uliční tričko s odvážným grafickým potiskem.',
      imageUrl: await toDataURL('Graphic Street Tee.jpg'),
      attributes: {
        create: {
          category: 'Trička',
          color: 'Černá',
          size: 'L',
          isOnSale: true,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'oversize-vintage-tricko',
      name: 'Oversize vintage tričko',
      priceCents: 27900,
      description: 'Oversize tričko inspirované vintage módou.',
      imageUrl: await toDataURL('Oversized Vintage Tee.jpg'),
      attributes: {
        create: {
          category: 'Trička',
          color: 'Béžová',
          size: 'XL',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'zakladni-mikina',
      name: 'Základní mikina',
      priceCents: 49900,
      description: 'Pohodlná mikina s měkkým fleecem uvnitř.',
      imageUrl: await toDataURL('Basic Hoodie.jpg'),
      attributes: {
        create: {
          category: 'Mikiny',
          color: 'Šedá',
          size: 'L',
          rating: 5,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'mikina-na-zip',
      name: 'Mikina na zip',
      priceCents: 54900,
      description: 'Mikina s celým zipem pro každodenní nošení.',
      imageUrl: await toDataURL('Zip-Up Hoodie.jpg'),
      attributes: {
        create: {
          category: 'Mikiny',
          color: 'Černá',
          size: 'M',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'slim-fit-dziny',
      name: 'Slim fit džíny',
      priceCents: 59900,
      description: 'Džíny z elastického denimu se slim fit střihem.',
      imageUrl: await toDataURL('Slim Fit Jeans.jpg'),
      attributes: {
        create: {
          category: 'Kalhoty',
          color: 'Tmavě modrá',
          size: 'L',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'kargo-kalhoty',
      name: 'Kargo kalhoty',
      priceCents: 64900,
      description: 'Praktické kargo kalhoty s více kapsami.',
      imageUrl: await toDataURL('Cargo Pants.jpg'),
      attributes: {
        create: {
          category: 'Kalhoty',
          color: 'Olivová',
          size: 'XL',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'lehke-letni-sortky',
      name: 'Lehké letní šortky',
      priceCents: 29900,
      description: 'Lehké šortky ideální na letní dny.',
      imageUrl: await toDataURL('Casual Summer Shorts.jpg'),
      attributes: {
        create: {
          category: 'Šortky',
          color: 'Khaki',
          size: 'M',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'sportovni-sortky',
      name: 'Sportovní šortky',
      priceCents: 24900,
      description: 'Prodyšné šortky pro trénink a běh.',
      imageUrl: await toDataURL('Sport Shorts.jpg'),
      attributes: {
        create: {
          category: 'Šortky',
          color: 'Černá',
          size: 'L',
          isOnSale: true,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'klasicke-boty',
      name: 'Klasické boty',
      priceCents: 79900,
      description: 'Nadčasové nízké boty s gumovou podrážkou.',
      imageUrl: await toDataURL('Classic Sneakers.jpg'),
      attributes: {
        create: {
          category: 'Boty',
          color: 'Bílá',
          size: 'M',
          rating: 5,
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'bezecke-boty',
      name: 'Běžecké boty',
      priceCents: 89900,
      description: 'Lehké běžecké boty s polstrovanou podrážkou.',
      imageUrl: await toDataURL('Running Shoes.jpg'),
      attributes: {
        create: {
          category: 'Boty',
          color: 'Zelená',
          size: 'L',
        },
      },
    },
  })

  await prisma.product.create({
    data: {
      slug: 'plateny-pasek',
      name: 'Plátěný pásek',
      priceCents: 16900,
      description: 'Odolný plátěný pásek s kovovou sponou.',
      attributes: {
        create: {
          category: 'Doplňky',
          color: 'Černá',
          size: 'M',
        },
      },
    },
  })
}

console.log('- seeded products')

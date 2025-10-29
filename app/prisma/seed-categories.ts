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
      name: 'Electronics',
      children: {
        create: [
          {
            id: 2,
            name: 'Phones',
            children: {
              create: [
                {
                  id: 3,
                  name: 'Android',
                  children: {
                    create: [
                      {
                        id: 4,
                        name: 'Samsung',
                        children: {
                          create: [
                            { id: 101, name: 'Galaxy S24' },
                            { id: 102, name: 'Galaxy A54' },
                            { id: 103, name: 'Galaxy Z Fold' },
                          ],
                        },
                      },
                      {
                        id: 5,
                        name: 'Google',
                        children: {
                          create: [
                            { id: 104, name: 'Pixel 8' },
                            { id: 105, name: 'Pixel 7a' },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: 6,
                  name: 'iOS',
                  children: {
                    create: [
                      { id: 106, name: 'iPhone 15 Pro' },
                      { id: 107, name: 'iPhone 15' },
                      { id: 108, name: 'iPhone SE' },
                    ],
                  },
                },
              ],
            },
          },
          {
            id: 7,
            name: 'Laptops',
            children: {
              create: [
                {
                  id: 8,
                  name: 'MacBook',
                  children: {
                    create: [
                      { id: 109, name: 'MacBook Air M3' },
                      { id: 110, name: 'MacBook Pro 14' },
                    ],
                  },
                },
                {
                  id: 9,
                  name: 'Windows',
                  children: {
                    create: [
                      {
                        id: 10,
                        name: 'Dell',
                        children: {
                          create: [
                            { id: 111, name: 'XPS 13' },
                            { id: 112, name: 'Inspiron 16' },
                          ],
                        },
                      },
                      {
                        id: 11,
                        name: 'Lenovo',
                        children: {
                          create: [
                            { id: 113, name: 'ThinkPad X1' },
                            { id: 114, name: 'Yoga 9i' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            id: 12,
            name: 'Accessories',
            children: {
              create: [
                { id: 115, name: 'AirPods Pro' },
                { id: 116, name: 'Magic Mouse' },
                { id: 117, name: 'USB-C Hub' },
              ],
            },
          },
          {
            id: 20,
            name: 'Fashion',
            children: {
              create: [
                {
                  id: 21,
                  name: 'Men',
                  children: {
                    create: [
                      {
                        id: 22,
                        name: 'Shoes',
                        children: {
                          create: [
                            { id: 201, name: 'Nike Air Max' },
                            { id: 202, name: 'Adidas Ultraboost' },
                            { id: 203, name: 'New Balance 550' },
                          ],
                        },
                      },
                      {
                        id: 23,
                        name: 'Watches',
                        children: {
                          create: [
                            { id: 204, name: 'Seiko 5' },
                            { id: 205, name: 'Citizen Promaster' },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: 24,
                  name: 'Women',
                  children: {
                    create: [
                      {
                        id: 25,
                        name: 'Dresses',
                        children: {
                          create: [
                            { id: 206, name: 'Summer Midi' },
                            { id: 207, name: 'Cocktail Dress' },
                          ],
                        },
                      },
                      {
                        id: 26,
                        name: 'Bags',
                        children: {
                          create: [
                            { id: 208, name: 'Leather Tote' },
                            { id: 209, name: 'Crossbody Mini' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            id: 30,
            name: 'Home',
            children: {
              create: [
                {
                  id: 31,
                  name: 'Kitchen',
                  children: {
                    create: [
                      {
                        id: 32,
                        name: 'Appliances',
                        children: {
                          create: [
                            { id: 301, name: 'Air Fryer' },
                            { id: 302, name: 'Blender' },
                            { id: 303, name: 'Coffee Maker' },
                          ],
                        },
                      },
                      {
                        id: 33,
                        name: 'Cookware',
                        children: {
                          create: [
                            { id: 304, name: 'Non-Stick Pan' },
                            { id: 305, name: 'Cast Iron Skillet' },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: 34,
                  name: 'Furniture',
                  children: {
                    create: [
                      { id: 306, name: 'Sofa 3-Seater' },
                      { id: 307, name: 'Dining Table' },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  })

  console.log(pc.green('- seeded categories'))
}

import { prisma } from './prisma'

export const seedUsers = async () => {
  if (await prisma.user.count()) {
    console.log('- skipping users')
    return
  }

  await prisma.user.create({
    data: {
      email: 'admin@test.com',
      emailAuth: {
        create: {
          passwordHash: '0SblNeeYwdZYYZmOqxiyXezms1QHsQBoPPO7jYudvcg=',
          passwordSalt: 'fiHszseHy/BovmPbZEdL2BFUnhB2yVAeCOiIPNVHe5Y=',
        },
      },
      admin: {
        create: {},
      },
    },
  })
}


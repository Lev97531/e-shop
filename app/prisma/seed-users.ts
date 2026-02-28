import { prisma } from './prisma'

export const seedUsers = async () => {
  if (await prisma.user.count()) {
    console.log('- skipping users')
    return
  }

  await prisma.user.create({
    data: {
      email: 'bebebe@gmail.com',
      emailAuth: {
        create: {
          passwordHash: 'sxfQCc65QdEg4CbORgQH2UPyGoB04drwXKks2K6GtqQ=',
          passwordSalt: 'IiRKm87TRseZ0Eua+updcufdIdNkJJSrQR1f8jom7Uk=',
        },
      },
      admin: {
        create: {},
      },
    },
  })
}


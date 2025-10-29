import pc from 'picocolors'
import { prisma } from './prisma'

export const seedUsers = async () => {
  if (await prisma.user.count()) {
    console.log(pc.yellow('- skipping users'))
    return
  }

  await prisma.user.createMany({
    data: [
      {
        id: 1,
        name: 'admin',
        email: 'admin@test.com',
      },
    ],
  })

  console.log(pc.green('- seeded users'))
}

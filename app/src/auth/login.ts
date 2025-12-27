import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { verifyPassword } from './hash-password'
import { loginSchema } from './login-form'

export const login = createServerFn()
  .inputValidator(loginSchema)
  .handler(async ({ data: { email, password } }) => {
    const user = await prisma.user.findUnique({ where: { email }, include: { emailAuth: true } })
    if (!user?.emailAuth) {
      throw new Error('Neplatné uživatelské jméno nebo heslo')
    }

    if (!(await verifyPassword(password, user.emailAuth.passwordSalt, user.emailAuth.passwordHash))) {
      throw new Error('Neplatné uživatelské jméno nebo heslo')
    }

    console.log('Logged in user: ', user.id, user.email)
  })

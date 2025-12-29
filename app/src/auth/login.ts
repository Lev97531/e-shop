import { createServerFn } from '@tanstack/react-start'
import { setCookie } from '@tanstack/react-start/server'
import { prisma } from 'prisma'
import { verifyPassword } from './hash-password'
import { loginSchema } from './login-form'

export const sessionDuration = 1000 * 60 * 60 * 24 * 30 // 30 days

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

    const expiresAt = new Date(Date.now() + sessionDuration)
    const session = await prisma.session.create({ data: { user: { connect: { id: user.id } }, expiresAt } })

    setCookie('session', session.id, { expires: expiresAt, httpOnly: true, sameSite: 'lax', secure: true })

    console.log('Logged in user: ', user.id, user.email)
  })

import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { registrationSchema } from './registration-form'
import { hashPassword } from './hash-password'

export const register = createServerFn()
  .inputValidator(registrationSchema)
  .handler(async ({ data: { email, password } }) => {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new Error('Uživatel už existuje')
    }

    const { salt, hash } = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        emailAuth: { create: { passwordHash: hash, passwordSalt: salt } },
      },
    })
    console.log('Registered user: ', user.id, user.email)
  })

import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { registrationSchema } from './registration-form'

export const register = createServerFn()
  .inputValidator(registrationSchema)
  .handler(async ({ data: { email, password, confirmPassword } }) => {
    console.log(email, password, confirmPassword)
  })

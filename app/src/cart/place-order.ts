import { prisma } from 'prisma'
import { CheckoutItem } from './checkout'
import { getAuthUser } from '~/auth/get-auth-user'
import { redirect } from '@tanstack/react-router'

export async function placeOrder(products: CheckoutItem[]) {
  const user = await getAuthUser()
  if (!user) {
    throw redirect({ to: '/' })
  }

  // await prisma.order.create({ data: { user: { connect: { id: user.id } },productLines:{create:{}} } })
}

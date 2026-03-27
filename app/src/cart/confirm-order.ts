import { prisma } from 'prisma'
import Stripe from 'stripe'

export async function confirmOrder(session: Stripe.Checkout.Session) {
  if (!session.metadata?.userId) {
    throw new Error('No user ID found in session metadata')
  }

  const userId = parseInt(session.metadata.userId)

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })
  if (!user) {
    throw new Error(`User with ID ${userId} not found`)
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
  if (!lineItems.data.length) {
    throw new Error('No line items found in session')
  }

  const totalPrice = lineItems.data.reduce((sum, item) => sum + item.amount_total, 0)

  const productLines = lineItems.data.map((item) => {
    return {
      productId: parseInt(item.metadata!.id),
      priceCents: item.amount_total || 0,
      quantity: item.quantity || 1,
    }
  })

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice,
      productLines: { create: productLines },
    },
  })

  console.log(`Created order ${order.id} for user ${user.email} with ${productLines.length} items`)
}

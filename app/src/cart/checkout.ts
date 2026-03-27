import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import Stripe from 'stripe'
import { id } from 'zod/v4/locales'
import { getAuthUser } from '~/auth/get-auth-user'

export type CheckoutItem = { id: number; quantity: number }

export const checkout = createServerFn({ method: 'POST' })
  .inputValidator((data: { products: CheckoutItem[] }) => data)
  .handler(async ({ data: { products } }) => {
    if (products.length === 0) {
      throw new Error('No products in cart')
    }

    // Get authenticated user
    const user = await getAuthUser()
    if (!user) {
      throw new Error('User must be logged in to checkout')
    }

    const productsInDb = await prisma.product.findMany({ where: { id: { in: products.map((p) => p.id) } } })
    const productsWithPrices = products.map((p) => {
      return {
        ...p,
        priceCents: productsInDb.find((pi) => pi.id === p.id)!.priceCents,
        name: productsInDb.find((pi) => pi.id === p.id)!.name,
      }
    })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = productsWithPrices.map(
      (p) =>
        ({
          price_data: {
            currency: 'czk',
            product_data: { name: p.name, metadata: { id: p.id } },
            unit_amount: p.priceCents,
          },
          quantity: p.quantity,
          metadata: { id: p.id },
        }) as Stripe.Checkout.SessionCreateParams.LineItem,
    )

    const baseUrl = process.env.WEBSITE_BASE_URL

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: lineItems,
      success_url: `${baseUrl}/order-success`,
      cancel_url: `${baseUrl}`,
      metadata: {
        userId: user.id.toString(),
      },
    })

    return session.url
  })

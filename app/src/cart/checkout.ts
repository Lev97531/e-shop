import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import Stripe from 'stripe'
import { placeOrder } from './place-order';

export type CheckoutItem = { id: number; quantity: number }

export const checkout = createServerFn({ method: 'POST' })
  .inputValidator((data: { products: CheckoutItem[] }) => data)
  .handler(async ({ data: { products } }) => {
    if (products.length === 0) {
      throw new Error('No products in cart')
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
        } as Stripe.Checkout.SessionCreateParams.LineItem)
    )

    const baseUrl = process.env.WEBSITE_BASE_URL

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: 'test@example.com',
      line_items: lineItems,
      success_url: `${baseUrl}/order-success`,
      cancel_url: `${baseUrl}`,
    })

    await placeOrder(products)

    return session.url
  })

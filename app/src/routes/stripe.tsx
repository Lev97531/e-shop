import { createFileRoute } from '@tanstack/react-router'
import stripe, { Stripe } from 'stripe'
import { confirmOrder } from '~/cart/confirm-order'

export const Route = createFileRoute('/stripe')({
  server: {
    handlers: {
      POST: action,
    },
  },
})

export async function action({ request }: { request: Request }) {
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    throw new Error('No Stripe signature found')
  }

  const body = await request.text()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    await confirmOrder(session)
  }

  return Response.json({ received: true })
}

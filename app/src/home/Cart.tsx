import { useShoppingCart } from '~/cart/useShoppingCart'
import { Dialog } from './Dialog'
import { CartItem, decreaseQuantity, deleteFromCart, increaseQuantity } from '~/cart/cart'
import { formatPrice } from '~/routes'
import NA from '~/shared/NA.jpg'
import { PropsWithChildren } from 'react'
import { createServerFn } from '@tanstack/react-start'
import { Stripe } from 'stripe'
import { prisma } from 'prisma'

type CheckoutItem = { id: number; quantity: number }

const checkout = createServerFn({ method: 'POST' })
  .inputValidator((data: { products: CheckoutItem[] }) => data)
  .handler(async ({ data: { products } }) => {
    const productsInDb = await prisma.product.findMany({ where: { id: { in: products.map((p) => p.id) } } })
    const productsWithPrices = products.map((p) => {
      return {
        ...p,
        priceCents: productsInDb.find((pi) => pi.id === p.id)!.priceCents,
        name: productsInDb.find((pi) => pi.id === p.id)!.name,
      }
    })

    console.log(productsWithPrices)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: { name: 'Demo Item' },
            unit_amount: 1999, // $19.99
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })
  })

export const Cart = () => {
  const shoppingCart = useShoppingCart()

  if (!shoppingCart.products.length) {
    return (
      <CartDialog>
        <div className="mt-4 text-2xl">Košík je prazdny</div>
      </CartDialog>
    )
  }

  return (
    <CartDialog>
      <div className="mt-4 flex flex-col gap-4">
        {shoppingCart.products.map((item, i) => (
          <div key={i} className="flex gap-4 bg-base-200 p-4 rounded-xl">
            <div className="flex items-center">
              <img width={128} src={item.product.imageUrl || NA} alt="Shoes" />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex justify-between">
                <div>{item.product.name}</div>
                <div className="flex gap-4">
                  <div className="opacity-60">{formatPrice(item.product.priceCents)} Kč / ks</div>
                  <div>{formatPrice(item.totalCents)} Kč</div>
                </div>
              </div>
              <span className="text-xs opacity-60 max-w-4/5">{item.product.description || <>&nbsp;</>}</span>
              <div className="mt-4 flex justify-between">
                <div className="join">
                  <button className="btn btn-soft join-item" onClick={() => decreaseQuantity(item.product)}>
                    ➖
                  </button>
                  <span className="btn btn-soft join-item cursor-default min-w-[8ch]">{item.quantity}</span>
                  <button className="btn btn-soft join-item" onClick={() => increaseQuantity(item.product)}>
                    ➕
                  </button>
                </div>
                <button className="btn btn-soft" onClick={() => deleteFromCart(item.product)}>
                  ❌
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end mt-4 items-center">
        <div className="text-right">
          <div>Cena k úhradě s DPH:</div>
          <div className="font-bold text-xl">{formatPrice(shoppingCart.grandTotalCents)} Kč</div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={async () => {
              const products = shoppingCart.products.map(
                (product) => ({ id: product.product.id, quantity: product.quantity } as CheckoutItem)
              )
              await checkout({ data: { products } })
            }}
          >
            Pokračovat
          </button>
        </div>
      </div>
    </CartDialog>
  )
}

function CartDialog({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <div className="text-4xl font-bold">Košík</div>
      {children}
    </Dialog>
  )
}

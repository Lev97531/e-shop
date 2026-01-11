import { useNavigate, useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Route } from '~/routes/_products/cart'
import { formatPrice } from '~/shared/format-price'
import NA from '~/shared/NA.jpg'
import type { ProductInCart } from './stored-cart-schema'
import { useShoppingCart } from './useShoppingCart'

export const Cart = () => {
  const navigate = useNavigate()
  const router = useRouter()
  const { products: cartProducts } = useShoppingCart()
  const products = Route.useLoaderData()

  const grandTotalCents = useMemo(() => {
    return cartProducts.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.id)
      if (!product) {
        router.invalidate()
        return acc
      }

      return acc + product.priceCents * item.quantity
    }, 0)
  }, [cartProducts, products])

  if (!products.length) {
    return <div className="mt-4 text-2xl">Košík je prázdný</div>
  }

  return (
    <>
      <div className="mt-4 flex flex-col gap-4">
        {cartProducts.map((item) => (
          <ShoppingCartProduct key={item.id} item={item} />
        ))}
      </div>
      <div className="flex gap-2 justify-end mt-4 items-center">
        <div className="text-right">
          <div>Cena k úhradě s DPH:</div>
          <div className="font-bold text-xl">{formatPrice(grandTotalCents)} Kč</div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={async () => {
              navigate({ to: '/checkout' })
            }}
          >
            Pokračovat
          </button>
        </div>
      </div>
    </>
  )
}

const ShoppingCartProduct = ({ item }: { item: ProductInCart }) => {
  const { addProductToCart, decreaseProductInCartQuantity, removeProductFromCart } = useShoppingCart()
  const products = Route.useLoaderData()

  const product = products.find((p) => p.id === item.id)
  if (!product) {
    return null
  }

  return (
    <div className="flex gap-4 bg-base-200 p-4 rounded-xl">
      <div className="flex items-center">
        <img width={128} src={product.imageUrl || NA} alt="Shoes" />
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between">
          <div>{product.name}</div>
          <div className="flex gap-4">
            <div className="opacity-60">{formatPrice(product.priceCents)} Kč / ks</div>
            <div>{formatPrice(product.priceCents * item.quantity)} Kč</div>
          </div>
        </div>
        <span className="text-xs opacity-60 max-w-4/5">{product.description || <>&nbsp;</>}</span>
        <div className="mt-4 flex justify-between">
          <div className="join">
            <button className="btn btn-soft join-item" onClick={() => decreaseProductInCartQuantity(item.id)}>
              ➖
            </button>
            <span className="btn btn-soft join-item cursor-default min-w-[8ch]">{item.quantity}</span>
            <button className="btn btn-soft join-item" onClick={() => addProductToCart(item.id)}>
              ➕
            </button>
          </div>
          <button className="btn btn-soft" onClick={() => removeProductFromCart(item.id)}>
            ❌
          </button>
        </div>
      </div>
    </div>
  )
}

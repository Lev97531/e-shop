import { useNavigate } from '@tanstack/react-router'
import { decreaseQuantity, deleteFromCart, increaseQuantity } from '~/cart/cart'
import { useShoppingCart } from '~/cart/useShoppingCart'
import { formatPrice } from '~/shared/format-price'
import NA from '~/shared/NA.jpg'

type CheckoutItem = { id: number; quantity: number }

export const Cart = () => {
  const navigate = useNavigate()
  const shoppingCart = useShoppingCart()

  if (!shoppingCart.products.length) {
    return <div className="mt-4 text-2xl">Košík je prázdný</div>
  }

  return (
    <>
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

import { useProductsInCard } from '~/cart/useProductsInCart'
import { Dialog } from './Dialog'
import { decreaseQuantity, deleteFromCart, increaseQuantity } from '~/cart/cart'
import { formatPrice } from '~/routes'

export const Cart = () => {
  const items = useProductsInCard()

  return (
    <Dialog>
      <div className="mt-8 flex flex-col gap-8 ">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <img width={128} src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex justify-between">
                <div>{item.product.name}</div>
                <div>{formatPrice(item.product.priceCents)}</div>
              </div>
              <span className="text-xs opacity-60 max-w-4/5">{item.product.description || <>&nbsp;</>}</span>
              <div className="mt-4 flex justify-between">
                <div className="join">
                  <button className="btn join-item" onClick={() => decreaseQuantity(item.product)}>
                    ➖
                  </button>
                  <span className="btn join-item cursor-default min-w-[8ch]">{item.quantity}</span>
                  <button className="btn join-item" onClick={() => increaseQuantity(item.product)}>
                    ➕
                  </button>
                </div>
                <button className="btn" onClick={() => deleteFromCart(item.product)}>
                  ❌
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Dialog>
  )
}


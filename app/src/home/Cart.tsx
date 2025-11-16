import { useProductsInCard } from '~/cart/useProductsInCart'
import { Dialog } from './Dialog'
import { decreaseQuantity, deleteFromCart, increaseQuantity } from '~/cart/cart'

export const Cart = () => {
  const items = useProductsInCard()

  return (
    <Dialog>
      {items.map((item, i) => (
        <div key={i} className="flex justify-between">
          <div>{item.product.name}</div>
          <div className="join">
            <button className="btn join-item" onClick={() => decreaseQuantity(item.product)}>
              ➖
            </button>
            <span className="btn join-item cursor-default">{item.quantity}</span>
            <button className="btn join-item" onClick={() => increaseQuantity(item.product)}>
              ➕
            </button>
          </div>
          <button className="btn" onClick={() => deleteFromCart(item.product)}>
            ❌
          </button>
        </div>
      ))}
    </Dialog>
  )
}


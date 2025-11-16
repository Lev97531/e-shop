import { useProductsInCard } from '~/cart/useProductsInCart'
import { Dialog } from './Dialog'
import { deleteFromCart } from '~/cart/cart'

export const Cart = () => {
  const items = useProductsInCard()

  return (
    <Dialog>
      {items.map((item, i) => (
        <div key={i} className="flex justify-between">
          <div>{item.name}</div>
          <button className="btn" onClick={() => deleteFromCart(item)}>
            ❌
          </button>
        </div>
      ))}
    </Dialog>
  )
}

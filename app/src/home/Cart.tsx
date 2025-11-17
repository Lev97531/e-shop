import { useProductsInCard } from '~/cart/useProductsInCart'
import { Dialog } from './Dialog'
import { decreaseQuantity, deleteFromCart, increaseQuantity } from '~/cart/cart'
import { formatPrice } from '~/routes'
import NA from '~/shared/NA.jpg'

export const Cart = () => {
  const items = useProductsInCard()

  return (
    <Dialog>
      <div className="mt-8 flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 bg-base-200 p-4 rounded-xl">
            <div className="flex items-center">
              <img width={128} src={item.product.imageUrl || NA} alt="Shoes" />
            </div>
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex justify-between">
                <div>{item.product.name}</div>
                <div>{formatPrice(item.product.priceCents)}</div>
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
    </Dialog>
  )
}


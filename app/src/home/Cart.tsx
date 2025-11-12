import { useProductsInCard } from '~/cart/useProductsInCart'
import { Dialog } from './Dialog'

export const Cart = () => {
  const items = useProductsInCard()

  return (
    <Dialog>
      {items.map((item, i) => (
        <div key={i}>{item.name}</div>
      ))}
    </Dialog>
  )
}

import { useSyncExternalStore } from 'react'
import { Dialog } from './Dialog'
import { cartStore } from '~/cart/cart-store'
import { cart } from '~/cart/cart'

export const Cart = () => {
  const items = useSyncExternalStore(
    (subscription) => cartStore.subscribe(subscription),
    () => cart.loadItems()
  )

  return (
    <Dialog>
      {items.map((item) => (
        <div>{item.name}</div>
      ))}
    </Dialog>
  )
}

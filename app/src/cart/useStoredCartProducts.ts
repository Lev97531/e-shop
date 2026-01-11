import { useMemo } from 'react'
import { dayMs } from '~/shared/consts'
import { storedCartSchema, type ProductInCart } from './stored-cart-schema'
import { cartSettings } from './stored-cart-settings'
import { useLocalStorage } from './useLocalStorage'

export const useStoredCartProducts = () => {
  const { data, saveToStorage } = useLocalStorage(cartSettings.localStorageKey, null as unknown)

  const products: ProductInCart[] = useMemo(() => {
    const { error, data: cart } = storedCartSchema.safeParse(data)
    if (error) {
      return []
    }

    return cart.products
  }, [data])

  const saveProducts = (products: ProductInCart[]) => {
    const cart = {
      version: cartSettings.localStorageVersion,
      expiresAt: new Date(Date.now() + cartSettings.cartExpirationDays * dayMs).toISOString(),
      products,
    }
    saveToStorage(cart)
  }

  return { products, saveProducts }
}

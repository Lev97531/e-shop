import { useCallback, useMemo } from 'react'
import { cartSettings } from './stored-cart-settings'
import { useStoredCartProducts } from './useStoredCartProducts'

export const useShoppingCart = () => {
  const { products, saveProducts } = useStoredCartProducts()

  const totalProducts = useMemo(() => products.reduce((total, item) => total + item.quantity, 0), [products])

  const addProductToCart = useCallback(
    (productId: number) => {
      const existingItem = products.find((item) => item.id === productId)
      if (!existingItem) {
        saveProducts([...products, { id: productId, quantity: 1 }])
        return true
      }

      if (existingItem.quantity >= cartSettings.maxProductQuantity) {
        return false
      }

      existingItem.quantity++
      saveProducts(products)

      return true
    },
    [products, saveProducts]
  )

  const removeProductFromCart = useCallback(
    (productId: number) => {
      const newProducts = products.filter((item) => item.id !== productId)
      saveProducts(newProducts)
    },
    [products, saveProducts]
  )

  const decreaseProductInCartQuantity = useCallback(
    (productId: number) => {
      const existingItem = products.find((item) => item.id === productId)
      if (!existingItem) {
        return
      }

      if (existingItem.quantity <= 1) {
        removeProductFromCart(productId)
        return
      }

      existingItem.quantity--
      saveProducts(products)
    },
    [products, removeProductFromCart, saveProducts]
  )

  const clearCart = useCallback(() => {
    saveProducts([])
  }, [saveProducts])

  return { products, totalProducts, addProductToCart, decreaseProductInCartQuantity, removeProductFromCart, clearCart }
}

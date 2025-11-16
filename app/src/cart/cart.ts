import type { Product } from '~/shared/types'
import { loadCartFromStorage, saveCartToStorage } from './cart-storage'
import { notifyCartSubscribers } from './useProductsInCart'

export let productsInCart: Product[] = []

export function loadCartItems() {
  productsInCart = loadCartFromStorage()
}

export function addToCart(product: Product) {
  productsInCart = [...productsInCart, product]

  saveCartToStorage(productsInCart)
  notifyCartSubscribers()
}

export function deleteFromCart(productToDelete: Product) {
  productsInCart = productsInCart.filter((product) => product.id !== productToDelete.id)

  saveCartToStorage(productsInCart)
  notifyCartSubscribers()
}

import type { Product } from '~/shared/types'
import { loadCartFromStorage, saveCartToStorage } from './cart-storage'
import { notifyCartSubscribers } from './useProductsInCart'

export type CartItem = { product: Product; quantity: number }

export let productsInCart: CartItem[] = []

export function loadCartItems() {
  productsInCart = loadCartFromStorage()
}

export function addToCart(product: Product) {
  const existingItem = productsInCart.find((item) => item.product.id === product.id)
  if (existingItem) {
    existingItem.quantity++
    productsInCart = [...productsInCart]
  } else {
    productsInCart = [...productsInCart, { product, quantity: 1 }]
  }

  saveCartToStorage(productsInCart)
  notifyCartSubscribers()
}

export function deleteFromCart(productToDelete: Product) {
  productsInCart = productsInCart.filter((item) => item.product.id !== productToDelete.id)

  saveCartToStorage(productsInCart)
  notifyCartSubscribers()
}

export function increaseQuantity(product: Product) {
  const existingItem = productsInCart.find((item) => item.product.id === product.id)
  if (!existingItem || existingItem.quantity >= 10) {
    return
  }

  existingItem.quantity++
  productsInCart = [...productsInCart]
  saveCartToStorage(productsInCart)
  notifyCartSubscribers()
}

export function decreaseQuantity(product: Product) {
  const existingItem = productsInCart.find((item) => item.product.id === product.id)
  if (!existingItem || existingItem.quantity < 1) {
    return
  }

  existingItem.quantity--

  if (existingItem.quantity < 1) {
    return deleteFromCart(product)
  }

  productsInCart = [...productsInCart]
  saveCartToStorage(productsInCart)
  notifyCartSubscribers()
}
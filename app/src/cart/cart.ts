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
    return increaseQuantity(product)
  }

  const newItems = [...productsInCart, { product, quantity: 1 }]
  setProductsInCart(newItems)
}

export function deleteFromCart(productToDelete: Product) {
  const remainingItems = productsInCart.filter((item) => item.product.id !== productToDelete.id)
  setProductsInCart(remainingItems)
}

export function increaseQuantity(product: Product) {
  const existingItem = productsInCart.find((item) => item.product.id === product.id)
  if (!existingItem || existingItem.quantity >= 10) {
    return
  }

  existingItem.quantity++
  setProductsInCart([...productsInCart])
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

  setProductsInCart([...productsInCart])
}

function setProductsInCart(items: CartItem[]) {
  productsInCart = items
  saveCartToStorage(productsInCart)
  notifyCartSubscribers()
}
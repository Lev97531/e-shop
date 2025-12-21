import type { Product } from '~/shared/types'
import { loadCartFromStorage, saveCartToStorage } from './cart-storage'
import { notifyCartSubscribers } from './useShoppingCart'

export type CartItem = { product: Product; quantity: number; totalCents: number }

export let shoppingCart: { products: CartItem[]; grandTotalCents: number; grandTotalQuantity: number } = {
  products: [],
  grandTotalCents: 0,
  grandTotalQuantity: 0,
}

const cartLoaded = Promise.withResolvers<void>()

function updateProductsTotal(products: CartItem[]) {
  const grandTotalCents = products.reduce((total, item) => total + item.totalCents, 0)
  const grandTotalQuantity = products.reduce((total, item) => total + item.quantity, 0)
  shoppingCart = { products, grandTotalCents, grandTotalQuantity }
}

export async function loadCartItems() {
  const products = await loadCartFromStorage()
  updateProductsTotal(products)
  notifyCartSubscribers()
  cartLoaded.resolve()
}

export function addToCart(product: Product) {
  const existingItem = shoppingCart.products.find((item) => item.product.id === product.id)
  if (existingItem) {
    return increaseQuantity(product)
  }

  const newItems = [...shoppingCart.products, { product, quantity: 1, totalCents: product.priceCents } as CartItem]
  setProductsInCart(newItems)
}

export function deleteFromCart(productToDelete: Product) {
  const remainingItems = shoppingCart.products.filter((item) => item.product.id !== productToDelete.id)
  setProductsInCart(remainingItems)
}

export async function clearCart() {
  await cartLoaded.promise
  setProductsInCart([])
}

export function increaseQuantity(product: Product) {
  const existingItem = shoppingCart.products.find((item) => item.product.id === product.id)
  if (!existingItem || existingItem.quantity >= 10) {
    return
  }

  existingItem.quantity++
  existingItem.totalCents = existingItem.product.priceCents * existingItem.quantity
  setProductsInCart([...shoppingCart.products])
}

export function decreaseQuantity(product: Product) {
  const existingItem = shoppingCart.products.find((item) => item.product.id === product.id)
  if (!existingItem || existingItem.quantity < 1) {
    return
  }

  existingItem.quantity--
  existingItem.totalCents = existingItem.product.priceCents * existingItem.quantity
  if (existingItem.quantity < 1) {
    return deleteFromCart(product)
  }

  setProductsInCart([...shoppingCart.products])
}

function setProductsInCart(products: CartItem[]) {
  updateProductsTotal(products)
  saveCartToStorage(products)
  notifyCartSubscribers()
}
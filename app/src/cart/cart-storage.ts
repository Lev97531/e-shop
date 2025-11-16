import { CartItem } from './cart'

export function loadCartFromStorage(): CartItem[] {
  try {
    const cartJson = localStorage.getItem('cart') ?? ''
    return JSON.parse(cartJson)
  } catch {
    return []
  }
}

export function saveCartToStorage(productsInCart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(productsInCart))
}

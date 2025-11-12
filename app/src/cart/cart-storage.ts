import type { Product } from '~/shared/types'

export function loadCartFromStorage(): Product[] {
  try {
    const cartJson = localStorage.getItem('cart') ?? ''
    return JSON.parse(cartJson)
  } catch {
    return []
  }
}

export function saveCartToStorage(productsInCart: Product[]) {
  localStorage.setItem('cart', JSON.stringify(productsInCart))
}

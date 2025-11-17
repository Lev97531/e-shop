import { createServerFn } from '@tanstack/react-start'
import { CartItem } from './cart'
import { prisma } from 'prisma'

type StoredItem = { productId: number; quantity: number }

const loadProducts = createServerFn()
  .inputValidator((data: { ids: number[] }) => data)
  .handler(async ({ data: { ids } }) => {
    const products = await prisma.product.findMany({ where: { id: { in: ids } } })
    return products
  })

export async function loadCartFromStorage(): Promise<CartItem[]> {
  try {
    const cartJson = localStorage.getItem('cart') ?? ''
    const items: StoredItem[] = JSON.parse(cartJson)

    const ids = items.map((item) => item.productId)
    const products = await loadProducts({ data: { ids } })

    const cartItems = items.map((item) => ({
      product: products.find((p) => p.id === item.productId)!,
      quantity: item.quantity,
    }))

    return cartItems
  } catch {
    return []
  }
}

export function saveCartToStorage(productsInCart: CartItem[]) {
  const items = productsInCart.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity,
  }))
  localStorage.setItem('cart', JSON.stringify(items))
}

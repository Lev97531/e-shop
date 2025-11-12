import { Prisma } from 'prisma'
import { cartStore } from './cart-store'

type Product = Prisma.ProductGetPayload<{}>

function loadItems() {
  const cartJson = localStorage.getItem('cart')

  return (cartJson ? JSON.parse(cartJson) : []) as Product[]
}

function saveItems(items: Product[]) {
  localStorage.setItem('cart', JSON.stringify(items))
  cartStore.notify()
}

function addItem(newItem: Product) {
  const items = loadItems()
  saveItems([...items, newItem])
}

function deleteItem(itemToDelete: Product) {
  const items = loadItems()
  saveItems(items.filter((item) => item.id !== itemToDelete.id))
}

export const cart = { addItem, deleteItem, loadItems }

import { Prisma } from 'prisma'

type Product = Prisma.ProductGetPayload<{}>

function loadItems() {
  return [] as Product[]
}

function saveItems(items: Product[]) {}

function addItem(newItem: Product) {
  const items = loadItems()
  saveItems([...items, newItem])
}

function deleteItem(itemToDelete: Product) {
  const items = loadItems()
  saveItems(items.filter((item) => item.id !== itemToDelete.id))
}

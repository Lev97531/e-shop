import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { z } from 'zod'
import { Cart } from '~/cart/Cart'
import { storedCartSchema, type ProductInCart } from '~/cart/stored-cart-schema'
import { cartSettings } from '~/cart/stored-cart-settings'
import { ModalDialog } from '~/components/ModalDialog'

const loadProductsSchema = z.array(z.number())

const loadProducts = createServerFn()
  .inputValidator(loadProductsSchema)
  .handler(async ({ data: ids }) => {
    const products = await prisma.product.findMany({ where: { id: { in: ids } } })

    return products
  })

export const Route = createFileRoute('/_products/cart')({
  component: RouteComponent,
  loader: async () => {
    const json = localStorage.getItem(cartSettings.localStorageKey)
    const data = json ? JSON.parse(json) : null

    const { success, data: cart } = storedCartSchema.safeParse(data)
    const productsInCart: ProductInCart[] = success ? cart.products : []

    const ids = productsInCart.map((item) => item.id)
    const products = await loadProducts({ data: ids })

    return products
  },
  ssr: false,
})

function RouteComponent() {
  return (
    <ModalDialog>
      <div className="text-4xl font-bold">Košík</div>
      <Cart />
    </ModalDialog>
  )
}

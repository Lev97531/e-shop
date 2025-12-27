import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { ProductList } from '~/home/ProductList'

const loadProducts = createServerFn().handler(async () => {
  return await prisma.product.findMany()
})

export const Route = createFileRoute('/_products')({
  component: RouteComponent,
  loader: async () => {
    return { products: await loadProducts() }
  },
  validateSearch: (search) => ({
    success: search.success as boolean | undefined,
  }),
})

function RouteComponent() {
  const { products } = Route.useLoaderData()
  const { success } = Route.useSearch()

  return (
    <ProductList products={products} success={success}>
      <Outlet />
    </ProductList>
  )
}

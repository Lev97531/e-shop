import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { getAuthUser } from '~/auth/get-auth-user'
import { Layout } from '~/home/Layout'
import { ProductList } from '~/home/ProductList'

const loadProducts = createServerFn().handler(async () => {
  return await prisma.product.findMany({ include: { attributes: true } })
})

export const Route = createFileRoute('/_products')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getAuthUser()
    return { user }
  },
  loader: async () => {
    return { products: await loadProducts() }
  },
  notFoundComponent: () => <h1>Not Found</h1>,
})

function RouteComponent() {
  const { products } = Route.useLoaderData()

  return (
    <Layout>
      <ProductList products={products}>
        <Outlet />
      </ProductList>
    </Layout>
  )
}

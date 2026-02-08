import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Fuse from 'fuse.js'
import { prisma } from 'prisma'
import { z } from 'zod'
import { getAuthUser } from '~/auth/get-auth-user'
import { Layout } from '~/home/Layout'
import { ProductList } from '~/home/ProductList'

const searchSchema = z.object({
  q: z.coerce.string().optional(),
})

const loadProductsSchema = z.object({
  q: z.string().default(''),
})

const loadProducts = createServerFn()
  .inputValidator(loadProductsSchema)
  .handler(async ({ data: { q } }) => {
    const allProducts = await prisma.product.findMany({ select: { id: true, name: true } })
    const fuse = new Fuse(allProducts, {
      keys: ['name'],
      threshold: 0.4,
      ignoreLocation: true,
    })

    const matched = q ? fuse.search(q).map((r) => r.item) : allProducts
    const matchedIds = matched.map((p) => p.id)
    const products = await prisma.product.findMany({ where: { id: { in: matchedIds } }, include: { attributes: true } })

    return products
  })

export const Route = createFileRoute('/_products')({
  validateSearch: searchSchema,
  component: RouteComponent,
  beforeLoad: async ({ search }) => {
    const user = await getAuthUser()
    return { user, search }
  },
  loader: async ({ context: { search } }) => {
    return { products: await loadProducts({ data: search }) }
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

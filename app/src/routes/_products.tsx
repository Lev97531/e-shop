import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Fuse from 'fuse.js'
import { prisma } from 'prisma'
import { z } from 'zod'
import { getAuthUser } from '~/auth/get-auth-user'
import { Layout } from '~/home/Layout'
import { Menu } from '~/home/Menu'
import { ProductList } from '~/home/ProductList'
import { Sort, sortNames } from '~/home/Sort'

const searchSchema = z.object({
  q: z.coerce.string().optional(),
  category: z.string().optional(),
  sort: z.string().optional(),
})

const loadProducts = createServerFn()
  .inputValidator(searchSchema)
  .handler(async ({ data: { q, category, sort } }) => {
    const allProducts = await prisma.product.findMany({ select: { id: true, name: true } })
    const fuse = new Fuse(allProducts, {
      keys: ['name'],
      threshold: 0.4,
      ignoreLocation: true,
    })

    const matched = q ? fuse.search(q).map((r) => r.item) : allProducts
    const matchedIds = matched.map((p) => p.id)
    const products = await prisma.product.findMany({
      where: {
        id: { in: matchedIds },
        ...(category && {
          attributes: {
            category: {
              equals: category,
            },
          },
        }),
      },
      orderBy: {
        ...(sort == sortNames.Nejlevnější && { priceCents: 'asc' }),
        ...(sort == sortNames.Nejdražší && { priceCents: 'desc' }),
      },
      include: { attributes: true },
    })

    const attributes = await prisma.productAttributes.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    })

    const categories = attributes.map((a) => a.category)

    return { products, categories }
  })

export const Route = createFileRoute('/_products')({
  validateSearch: searchSchema,
  component: RouteComponent,
  beforeLoad: async ({ search }) => {
    const user = await getAuthUser()

    return { user, search }
  },
  loader: async ({ context: { search } }) => {
    const { products, categories } = await loadProducts({ data: search })

    return { products, categories }
  },
  notFoundComponent: () => <h1>Not Found</h1>,
})

function RouteComponent() {
  const { products } = Route.useLoaderData()

  return (
    <Layout>
      <div className="flex gap-2">
        <Menu />
        <div className="flex flex-col gap-2 flex-1">
          <Sort />
          <ProductList products={products}>
            <Outlet />
          </ProductList>
        </div>
      </div>
    </Layout>
  )
}

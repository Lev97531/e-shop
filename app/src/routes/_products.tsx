import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Fuse from 'fuse.js'
import { prisma } from 'prisma'
import { z } from 'zod'
import { getAuthUser } from '~/auth/get-auth-user'
import { Colors } from '~/home/Colors'
import { Layout } from '~/home/Layout'
import { Menu } from '~/home/Menu'
import { ProductList } from '~/home/ProductList'
import { Sizes } from '~/home/Sizes'
import { Sort, sortNames } from '~/home/Sort'

const searchSchema = z.object({
  q: z.coerce.string().optional(),
  category: z.string().optional(),
  sort: z.string().optional(),
  size: z.array(z.string()).optional(),
  color: z.array(z.string()).optional(),
})

const loadProducts = createServerFn()
  .inputValidator(searchSchema)
  .handler(async ({ data: { q, category, sort, size, color } }) => {
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
        attributes: {
          AND: [
            ...(category ? [{ category: { equals: category } }] : []),
            ...(size?.length ? [{ size: { in: size } }] : []),
            ...(color?.length ? [{ color: { in: color } }] : []),
          ],
        },
      },
      orderBy: {
        ...(sort == sortNames.Nejlevnější && { priceCents: 'asc' }),
        ...(sort == sortNames.Nejdražší && { priceCents: 'desc' }),
      },
      include: { attributes: true },
    })

    const categories = await getCategories()
    const sizes = await getSizes()
    const colors = await getColors()

    return { products, categories, sizes, colors }
  })

async function getCategories() {
  const attributes = await prisma.productAttributes.findMany({
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  })

  const categories = attributes.map((a) => a.category)
  return categories
}

async function getSizes() {
  const attributes = await prisma.productAttributes.findMany({
    select: { size: true },
    distinct: ['size'],
    orderBy: { size: 'asc' },
  })

  const sizes = attributes.map((a) => a.size!)
  return sizes
}

async function getColors() {
  const attributes = await prisma.productAttributes.findMany({
    select: { color: true },
    distinct: ['color'],
    orderBy: { color: 'asc' },
  })

  const colors = attributes.map((a) => a.color!)
  return colors
}

export const Route = createFileRoute('/_products')({
  validateSearch: searchSchema,
  component: RouteComponent,
  beforeLoad: async ({ search }) => {
    const user = await getAuthUser()

    return { user, search }
  },
  loader: async ({ context: { search } }) => {
    return await loadProducts({ data: search })
  },
  loaderDeps: ({ search }) => ({ search }),
  notFoundComponent: () => <h1>Not Found</h1>,
})

function RouteComponent() {
  const { products } = Route.useLoaderData()

  return (
    <Layout>
      <div className="flex gap-2">
        <div className="flex flex-col gap-2">
          <Menu />
          <Sizes />
          <Colors />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-baseline">
            <div className="text-3xl font-semibold">Počet nalezených produktů: {products.length}</div>
            <Sort />
          </div>
          <ProductList products={products}>
            <Outlet />
          </ProductList>
        </div>
      </div>
    </Layout>
  )
}

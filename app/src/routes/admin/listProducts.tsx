import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import z from 'zod'
import { ProductsTable } from '~/admin/ProductsTable'


const productListPageSize = 10

const loadProductSchema = z.object({
  page: z.number(),
})

const loadProducts = createServerFn()
  .inputValidator(loadProductSchema)
  .handler(async ({ data: { page } }) => {
    const skip = (page - 1) * productListPageSize

    const products = await prisma.product.findMany({ include: { attributes: true }, take: productListPageSize, skip })
    const count = await prisma.product.count()

    const totalPages = Math.ceil(count / productListPageSize)

    return { products, totalPages }
  })

export const Route = createFileRoute('/admin/listProducts')({
  component: RouteComponent,
  validateSearch: (search) => ({
    page: search.page as number | undefined,
  }),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({
    deps: {
      search: { page = 1 },
    },
  }) => {
    const { products, totalPages } = await loadProducts({ data: { page } })

    const prevPage = page > 1 ? page - 1 : null
    const nextPage = page < totalPages ? page + 1 : null

    return { products, page, totalPages, prevPage, nextPage }
  },
})

function RouteComponent() {
  const { totalPages, prevPage, nextPage, page } = Route.useLoaderData()
  return (
    <>
      <ProductsTable />
      <div>Total: {totalPages}</div>
      {prevPage && (
        <Link className="btn btn-primary" to="/admin/listProducts" search={{ page: prevPage }}>
          Prev
        </Link>
      )}
      {nextPage && (
        <Link className="btn btn-primary" to="/admin/listProducts" search={{ page: nextPage }}>
          Next
        </Link>
      )}
    </>
  )
}

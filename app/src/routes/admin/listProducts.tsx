import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import z from 'zod'
import { ProductsTable } from '~/admin/ProductsTable'
import React from 'react'

const productListPageSize = 10

const loadProductSchema = z.object({
  page: z.number(),
  q: z.string().optional(),
})

const searchSchema = z.object({
  page: z.number().optional(),
  q: z.string().optional(),
})

const loadProducts = createServerFn()
  .inputValidator(loadProductSchema)
  .handler(async ({ data: { page, q } }) => {
    const skip = (page - 1) * productListPageSize

    const where = q
      ? {
          name: {
            contains: q,
          },
        }
      : undefined

    console.log('123123', where)

    const products = await prisma.product.findMany({ include: { attributes: true }, take: productListPageSize, skip, where })
    const count = await prisma.product.count({ where })

    const totalPages = Math.ceil(count / productListPageSize)

    return { products, totalPages }
  })

export const Route = createFileRoute('/admin/listProducts')({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({
    deps: {
      search: { page = 1, q },
    },
  }) => {
    const { products, totalPages } = await loadProducts({ data: { page, q } })

    const prevPage = page > 1 ? page - 1 : null
    const nextPage = page < totalPages ? page + 1 : null

    return { products, page, totalPages, prevPage, nextPage }
  },
})

function RouteComponent() {
  const { totalPages, prevPage, nextPage } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const [query, setQuery] = React.useState(search.q ?? '')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate({ to: '/admin/listProducts', search: (prev) => ({ ...prev, q: query || undefined, page: 1 }) })
  }
  return (
    <>
      <form onSubmit={onSubmit} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
        {search.q ? (
          <button
            type="button"
            className="btn"
            onClick={() => navigate({ to: '/admin/listProducts', search: (prev) => ({ ...prev, q: undefined, page: 1 }) })}
          >
            Clear
          </button>
        ) : null}
      </form>
      <ProductsTable />
      <div>Total: {totalPages}</div>
      {prevPage && (
        <Link className="btn btn-primary" to="/admin/listProducts" search={{ page: prevPage, q: search.q }}>
          Prev
        </Link>
      )}
      {nextPage && (
        <Link className="btn btn-primary" to="/admin/listProducts" search={{ page: nextPage, q: search.q }}>
          Next
        </Link>
      )}
    </>
  )
}

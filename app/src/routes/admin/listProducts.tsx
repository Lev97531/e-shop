import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import z from 'zod'
import { ProductsTable } from '~/admin/ProductsTable'
import React from 'react'
import Fuse from 'fuse.js'

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

    const query = q?.trim()

    if (query) {
      const allProducts = await prisma.product.findMany({ include: { attributes: true } })
      const fuse = new Fuse(allProducts, {
        keys: ['name'],
        threshold: 0.4,
        ignoreLocation: true,
      })
      const matched = fuse.search(query).map((r) => r.item)
      const count = matched.length
      const totalPages = Math.max(1, Math.ceil(count / productListPageSize))
      const products = matched.slice(skip, skip + productListPageSize)
      return { products, totalPages }
    }

    const products = await prisma.product.findMany({ include: { attributes: true }, take: productListPageSize, skip })
    const count = await prisma.product.count()

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
  const { totalPages, prevPage, nextPage, page } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const [query, setQuery] = React.useState(search.q ?? '')

  React.useEffect(() => {
    const qTrim = query.trim()
    const handle = setTimeout(() => {
      if (qTrim.length >= 3) {
        navigate({ to: '/admin/listProducts', search: (prev) => ({ ...prev, q: qTrim, page: 1 }) })
      } else if (qTrim.length === 0 && (search.q ?? '').trim().length > 0) {
        navigate({ to: '/admin/listProducts', search: (prev) => ({ ...prev, q: undefined, page: 1 }) })
      }
    }, 500)
    return () => clearTimeout(handle)
  }, [query, navigate, search.q])

  React.useEffect(() => {
    setQuery((search.q ?? '').toString())
  }, [search.q])
  return (
    <div className="flex flex-col gap-4 mt-8">
      <input
        type="search"
        placeholder="Search by name..."
        className="input input-bordered"
        value={query}
        onChange={(e) => {
          const value = e.target.value
          setQuery(value)

          if (value == '') {
            navigate({ to: '/admin/listProducts', search: (prev) => ({ ...prev, q: undefined, page: 1 }) })
          }
        }}
      />
      <ProductsTable />
      <div className="flex items-center justify-center gap-3">
        {prevPage ? (
          <Link className="btn btn-primary" to="/admin/listProducts" search={{ page: prevPage, q: search.q }}>
            Prev
          </Link>
        ) : (
          <button className="btn btn-primary btn-disabled" aria-disabled>
            Prev
          </button>
        )}
        <div className="opacity-80">Page {page} of {totalPages}</div>
        {nextPage ? (
          <Link className="btn btn-primary" to="/admin/listProducts" search={{ page: nextPage, q: search.q }}>
            Next
          </Link>
        ) : (
          <button className="btn btn-primary btn-disabled" aria-disabled>
            Next
          </button>
        )}
      </div>
    </div>
  )
}

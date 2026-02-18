import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { z } from 'zod'
import { ProductsTable } from '~/admin/ProductsTable'
import React from 'react'
import Fuse from 'fuse.js'
import { MIN_SEARCH_QUERY_LENGTH, SEARCH_DEBOUNCE_TIME_MS } from '~/shared/consts'
import { useSearch } from '~/shared/useSearch'

const productListPageSize = 10

const loadProductSchema = z.object({
  page: z.number(),
  q: z.coerce.string().optional(),
})

const searchSchema = z.object({
  page: z.number().optional(),
  q: z.coerce.string().optional(),
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

export const Route = createFileRoute('/admin/products')({
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
  const routeSearch = Route.useSearch()

  const { search, setSearch } = useSearch({
    initialSearch: routeSearch.q,
    onSearchChange: (query) =>
      navigate({
        to: '/admin/products',
        search: (prev) => ({ ...prev, q: query, page: 1 }),
      }),
  })
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex gap-4">
        <input
          type="search"
          placeholder="Search by name..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => navigate({ to: '/admin/products/new', search: (prev) => prev })}>
          Add product
        </button>
      </div>
      <ProductsTable />
      <div className="flex items-center justify-center gap-3">
        {prevPage ? (
          <Link className="btn btn-primary" to="/admin/products" search={{ page: prevPage, q: routeSearch.q }}>
            Prev
          </Link>
        ) : (
          <button className="btn btn-primary btn-disabled" aria-disabled>
            Prev
          </button>
        )}
        <div className="opacity-80">
          Page {page} of {totalPages}
        </div>
        {nextPage ? (
          <Link className="btn btn-primary" to="/admin/products" search={{ page: nextPage, q: routeSearch.q }}>
            Next
          </Link>
        ) : (
          <button className="btn btn-primary btn-disabled" aria-disabled>
            Next
          </button>
        )}
      </div>
      <Outlet />
    </div>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Fuse from 'fuse.js'
import { prisma } from 'prisma'
import { z } from 'zod'
import { formatPrice } from '~/shared/format-price'
import { useSearch } from '~/shared/useSearch'

const orderListPageSize = 10

const loadOrderSchema = z.object({
  page: z.number(),
  q: z.coerce.string().optional(),
})

const searchSchema = z.object({
  page: z.number().optional(),
  q: z.coerce.string().optional(),
})

const loadOrders = createServerFn()
  .inputValidator(loadOrderSchema)
  .handler(async ({ data: { page, q } }) => {
    const skip = (page - 1) * orderListPageSize

    const query = q?.trim()

    if (query) {
      const allOrders = await prisma.order.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
          productLines: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  priceCents: true,
                },
              },
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
      })

      const fuse = new Fuse(allOrders, {
        keys: ['user.email'],
        threshold: 0.4,
        ignoreLocation: true,
      })

      const matched = fuse.search(query).map((r) => r.item)
      const matchedIds = matched.map((o) => o.id)
      const count = matched.length
      const totalPages = Math.max(1, Math.ceil(count / orderListPageSize))
      const orders = matched.slice(skip, skip + orderListPageSize)

      return { orders, totalPages }
    }

    const orders = await prisma.order.findMany({
      take: orderListPageSize,
      skip,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
        productLines: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                priceCents: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    const count = await prisma.order.count()
    const totalPages = Math.ceil(count / orderListPageSize)

    return { orders, totalPages }
  })

export const Route = createFileRoute('/admin/orders')({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({
    deps: {
      search: { page = 1, q },
    },
  }) => {
    const { orders, totalPages } = await loadOrders({ data: { page, q } })

    const prevPage = page > 1 ? page - 1 : null
    const nextPage = page < totalPages ? page + 1 : null

    return { orders, page, totalPages, prevPage, nextPage }
  },
})

function RouteComponent() {
  const { orders, totalPages, prevPage, nextPage, page } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const routeSearch = Route.useSearch()

  const { search, setSearch } = useSearch({
    initialSearch: routeSearch.q,
    onSearchChange: (query) =>
      navigate({
        to: '/admin/orders',
        search: (prev) => ({ ...prev, q: query, page: 1 }),
      }),
  })

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h1 className="text-2xl font-semibold">Objednávky</h1>
      <div className="flex gap-4">
        <input
          type="search"
          placeholder="Hledat podle e-mailu zákazníka..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Datum</th>
              <th>Zákazník</th>
              <th>Celková cena</th>
              <th>Položky</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-mono">#{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString('cs-CZ')}</td>
                <td>{order.user.email}</td>
                <td className="font-semibold">{formatPrice(order.totalPrice)} Kč</td>
                <td>
                  <div className="space-y-1">
                    {order.productLines.map((line) => (
                      <div key={line.id} className="text-sm">
                        {line.quantity}x {line.product.name}
                        <span className="opacity-60 ml-2">({formatPrice(line.priceCents)} Kč)</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-3">
        {prevPage ? (
          <Link className="btn btn-primary" to="/admin/orders" search={{ page: prevPage, q: routeSearch.q }}>
            Předchozí
          </Link>
        ) : (
          <button className="btn btn-primary btn-disabled" aria-disabled>
            Předchozí
          </button>
        )}
        <div className="opacity-80">
          Stránka {page} z {totalPages}
        </div>
        {nextPage ? (
          <Link className="btn btn-primary" to="/admin/orders" search={{ page: nextPage, q: routeSearch.q }}>
            Další
          </Link>
        ) : (
          <button className="btn btn-primary btn-disabled" aria-disabled>
            Další
          </button>
        )}
      </div>
    </div>
  )
}

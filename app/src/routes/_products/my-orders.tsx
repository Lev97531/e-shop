import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { z } from 'zod'
import { formatPrice } from '~/shared/format-price'
import { getAuthUser } from '~/auth/get-auth-user'
import { ModalDialog } from '~/components/ModalDialog'

const orderListPageSize = 5

const loadOrderSchema = z.object({
  page: z.number(),
})

const searchSchema = z.object({
  page: z.number().optional(),
})

const loadOrders = createServerFn()
  .inputValidator(loadOrderSchema)
  .handler(async ({ data: { page } }) => {
    const user = await getAuthUser()
    if (!user) {
      throw new Error('User not found')
    }

    const skip = (page - 1) * orderListPageSize

    const orders = await prisma.order.findMany({
      take: orderListPageSize,
      skip,
      where: {
        userId: user.id,
      },
      include: {
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

    const count = await prisma.order.count({
      where: {
        userId: user.id,
      },
    })
    const totalPages = Math.ceil(count / orderListPageSize)

    return { orders, totalPages }
  })

export const Route = createFileRoute('/_products/my-orders')({
  component: RouteComponent,
  validateSearch: searchSchema,
  beforeLoad: async () => {
    const user = await getAuthUser()
    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({
    deps: {
      search: { page = 1 },
    },
  }) => {
    const { orders, totalPages } = await loadOrders({ data: { page } })

    const prevPage = page > 1 ? page - 1 : null
    const nextPage = page < totalPages ? page + 1 : null

    return { orders, page, totalPages, prevPage, nextPage }
  },
})

function RouteComponent() {
  const { orders, totalPages, prevPage, nextPage, page } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const routeSearch = Route.useSearch()

  if (!orders.length) {
    return (
      <ModalDialog>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Moje objednávky</h1>
          <div className="mt-4 text-2xl">Zatím nemáte žádné objednávky.</div>
        </div>
      </ModalDialog>
    )
  }

  return (
    <ModalDialog>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Moje objednávky</h1>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Datum</th>
                <th>Celková cena</th>
                <th>Položky</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="font-mono">#{order.id}</td>
                  <td>{new Date(order.date).toLocaleDateString('cs-CZ')}</td>
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
            <Link className="btn btn-primary" to="/my-orders" search={{ page: prevPage }}>
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
            <Link className="btn btn-primary" to="/my-orders" search={{ page: nextPage }}>
              Další
            </Link>
          ) : (
            <button className="btn btn-primary btn-disabled" aria-disabled>
              Další
            </button>
          )}
        </div>
      </div>
    </ModalDialog>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { formatPrice } from '~/shared/format-price'

// Server function to fetch orders
const getOrders = createServerFn().handler(async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true
        }
      },
      productLines: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              priceCents: true
            }
          }
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  })
  
  return orders
})

export const Route = createFileRoute('/admin/orders')({
  component: RouteComponent,
  loader: () => getOrders()
})

function RouteComponent() {
  const orders = Route.useLoaderData()
  
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Objednávky</h1>
      
      {orders.length === 0 ? (
        <p className="opacity-70">Žádné objednávky k zobrazení.</p>
      ) : (
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
                          <span className="opacity-60 ml-2">
                            ({formatPrice(line.priceCents)} Kč)
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

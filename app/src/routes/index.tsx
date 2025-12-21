import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Prisma, prisma } from 'prisma'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { addToCart, clearCart } from '~/cart/cart'
import NA from '~/shared/NA.jpg'

const loadProducts = createServerFn().handler(async () => {
  return await prisma.product.findMany()
})

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    return { products: await loadProducts() }
  },
  validateSearch: (search) => ({
    success: search.success as boolean | undefined,
  }),
})

function RouteComponent() {
  const { products } = Route.useLoaderData()
  const { success } = Route.useSearch()

  useEffect(() => {
    if (success) {
      toast.success('Děkujeme za nakup!', { duration: 10_000 })
      clearCart()
    }
  }, [success])

  return (
    <div className="inline-flex flex-wrap gap-4 mx-auto">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  )
}

function Product({ product }: { product: Prisma.ProductGetPayload<{}> }) {
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="mt-4">
        <img width={200} src={product.imageUrl || NA} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <p className="font-bold text-2xl">{formatPrice(product.priceCents)},-</p>
          <button
            className="btn btn-primary"
            onClick={() => {
              toast.success(`${product.name} uspšně byl přidan do košiku`)
              addToCart(product)
            }}
          >
            Do košíku
          </button>
        </div>
      </div>
    </div>
  )
}

export function formatPrice(cents?: number) {
  if (!cents) {
    return 'N/A'
  }

  const crowns = Math.round(cents / 100)
  const formatted = crowns.toLocaleString('cs-CZ').replace(/\s/g, '\u00A0')

  return formatted
}

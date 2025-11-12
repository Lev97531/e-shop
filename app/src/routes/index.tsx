import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Prisma, prisma } from 'prisma'
import { addToCart } from '~/cart/cart'

const loadProducts = createServerFn().handler(async () => {
  return await prisma.product.findMany()
})

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async () => {
    return { products: await loadProducts() }
  },
})

function RouteComponent() {
  const { products } = Route.useLoaderData()

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
        <img width={200} src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <p className="font-bold text-2xl">{product.priceCents ? formatPrice(product.priceCents) : 'N/A'}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Do košíku
          </button>
        </div>
      </div>
    </div>
  )
}

function formatPrice(cents: number) {
  const crowns = Math.round(cents / 100)
  const formatted = crowns.toLocaleString('cs-CZ').replace(/\s/g, '\u00A0')

  return `${formatted},-`
}

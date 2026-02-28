import { Link } from '@tanstack/react-router'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'
import { useShoppingCart } from '~/cart/useShoppingCart'
import NA from '~/shared/NA.jpg'
import { formatPrice } from '~/shared/format-price'
import { Product } from '~/shared/types'

export function ProductList({ products, children }: PropsWithChildren<{ products: Product[] }>) {
  return (
    <div className="flex flex-wrap gap-4">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      {children}
    </div>
  )
}

function ProductItem({ product }: { product: Product }) {
  const { addProductToCart } = useShoppingCart()

  return (
    <div className="card bg-base-200 w-88 shadow-sm">
      <figure className="mt-4">
        <img width={200} src={product.imageUrl || NA} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <p className="font-bold text-2xl">{formatPrice(product.priceCents)},-</p>
          <Link
            className="btn btn-secondary"
            to="/$productSlug"
            params={{ productSlug: product.slug }}
            search={(prev) => ({ ...prev })}
          >
            Show details
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => {
              addProductToCart(product.id)
              toast.success(`${product.name} uspšně byl přidan do košiku`)
            }}
          >
            Do košíku
          </button>
        </div>
      </div>
    </div>
  )
}

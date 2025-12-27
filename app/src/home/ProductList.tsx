import { Link } from '@tanstack/react-router'
import { PropsWithChildren, useEffect } from 'react'
import { toast } from 'sonner'
import { addToCart, clearCart } from '~/cart/cart'
import NA from '~/shared/NA.jpg'
import { formatPrice } from '~/shared/format-price'
import { Product } from '~/shared/types'

export function ProductList({ products, success, children }: PropsWithChildren<{ products: Product[]; success?: boolean }>) {
  useEffect(() => {
    if (success) {
      toast(
        <div className="text-5xl flex flex-col gap-4">
          <div>Děkujeme za nakup!</div>
          <div className="mx-auto text-7xl">🎉</div>
        </div>,
        { duration: 10_000 }
      )
      clearCart()
    }
  }, [success])

  return (
    <div className="inline-flex flex-wrap gap-4 mx-auto">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
      {children}
    </div>
  )
}

function ProductItem({ product }: { product: Product }) {
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
          <Link
            className="btn btn-primary"
            to="/$productSlug"
            params={{ productSlug: product.slug }}
            search={{ success: undefined }}
          >
            Show details
          </Link>
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

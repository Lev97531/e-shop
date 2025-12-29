import { Product } from '~/shared/types'
import NA from '~/shared/NA.jpg'
import { formatPrice } from '~/shared/format-price'
import { toast } from 'sonner'
import { addToCart } from '~/cart/cart'

export const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <form method="dialog" className="flex flex-col gap-4">
      <div className="flex gap-4 rounded-xl">
        <div className="flex items-center">
          <img width={256} src={product.imageUrl || NA} alt="Shoes" />
        </div>
        <div className="flex flex-col flex-1 gap-8">
          <div className="font-bold text-2xl">{product.name}</div>
          <span className="text-lg max-w-4/5">{product.description || <>&nbsp;</>}</span>
        </div>
      </div>
      <div className="flex justify-end gap-4 items-baseline">
        <div className="font-bold text-2xl">{formatPrice(product.priceCents)} Kč / ks</div>
        <button
          className="btn btn-primary h-12 text-xl"
          onClick={() => {
            toast.success(`${product.name} uspšně byl přidan do košiku`)
            addToCart(product)
          }}
        >
          Do košíku
        </button>
      </div>
    </form>
  )
}

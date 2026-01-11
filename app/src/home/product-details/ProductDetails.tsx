import { toast } from 'sonner'
import { useShoppingCart } from '~/cart/useShoppingCart'
import NA from '~/shared/NA.jpg'
import { formatPrice } from '~/shared/format-price'
import { Product } from '~/shared/types'

export const ProductDetails = ({ product }: { product: Product }) => {
  const { addProductToCart } = useShoppingCart()

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
            addProductToCart(product.id)
          }}
        >
          Do košíku
        </button>
      </div>
    </form>
  )
}

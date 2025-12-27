import { Cart } from './Cart'
import cartSvg from '../shared/shopping-cart-dark.svg'
import { useShoppingCart } from '~/cart/useShoppingCart'

export const Header = () => {
  const shoppingCart = useShoppingCart()

  return (
    <div className="h-24 bg-[#22223b]">
      Header
      <div>
        <button
          className="btn btn-ghost h-auto"
          onClick={() => (document.getElementById('shopping-cart') as HTMLDialogElement)?.showModal()}
        >
          <img src={cartSvg} width={32} />

          <div className="badge badge-secondary badge-sm -ml-5 -mt-7">{shoppingCart.grandTotalQuantity}</div>
        </button>
        <Cart />
      </div>
    </div>
  )
}

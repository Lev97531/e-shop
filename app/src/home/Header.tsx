import { useNavigate } from '@tanstack/react-router'
import { useShoppingCart } from '~/cart/useShoppingCart'
import cartSvg from '../shared/shopping-cart-dark.svg'

export const Header = () => {
  const navigate = useNavigate()
  const shoppingCart = useShoppingCart()

  return (
    <div className="h-24 bg-[#22223b]">
      Header
      <div>
        <button className="btn btn-ghost h-auto" onClick={() => navigate({ to: '/cart', search: { success: undefined } })}>
          <img src={cartSvg} width={32} />

          <div className="badge badge-secondary badge-sm -ml-5 -mt-7">{shoppingCart.grandTotalQuantity}</div>
        </button>
      </div>
    </div>
  )
}

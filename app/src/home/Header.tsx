import { Link, useNavigate } from '@tanstack/react-router'
import { useShoppingCart } from '~/cart/useShoppingCart'
import cartSvg from '../shared/shopping-cart-dark.svg'
import { Route } from '~/routes/_products'
import { ChevronDown } from 'lucide-react'
import { SearchProduct } from './SearchProduct'

export const Header = () => {
  const navigate = useNavigate()
  const { totalProducts } = useShoppingCart()
  const { user } = Route.useRouteContext()

  return (
    <div className="h-24 dark:bg-[#22223b] light:bg-[#ffffff]">
      <div className="flex justify-between h-full items-center m-4">
        <div className="flex gap-8 items-center">
          <div className="text-5xl font-bold italic -translate-y-1">e-shop.cz</div>
          <SearchProduct />
        </div>
        <div>
          <button className="btn btn-ghost h-auto" onClick={() => navigate({ to: '/cart' })}>
            <img src={cartSvg} width={32} />

            <div className="badge badge-secondary badge-sm -ml-5 -mt-7">{totalProducts}</div>
          </button>
          {user ? (
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                {user.email}
                <ChevronDown size={20} />
              </div>
              <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>
                  <Link to="/logout">Odhlasit se</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-ghost underline underline-offset-2 " to="/login">
              Přihlásit se
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

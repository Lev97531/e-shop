import { Link, useNavigate } from '@tanstack/react-router'
import { useShoppingCart } from '~/cart/useShoppingCart'
import cartSvg from '../shared/shopping-cart-light.svg'
import { Route } from '~/routes/_products'
import { ChevronDown } from 'lucide-react'
import { SearchProduct } from './SearchProduct'

export const Header = () => {
  const navigate = useNavigate()
  const { totalProducts } = useShoppingCart()
  const { user } = Route.useRouteContext()

  return (
    <div className="h-24 bg-base-300">
      <div className="flex justify-between h-full items-center m-4">
        <div className="flex gap-8 items-center">
          <Link className="text-5xl font-bold italic -translate-y-1" to="/">
            e-shop.cz
          </Link>
          <SearchProduct />
        </div>
        <div className="flex gap-4 items-center">
          <button className="btn btn-link h-auto" onClick={() => navigate({ to: '/cart' })}>
            <img src={cartSvg} width={32} />

            <div className="badge badge-primary badge-sm -ml-5 -mt-7">{totalProducts}</div>
          </button>
          {user ? (
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                {user.email}
                <ChevronDown size={20} />
              </div>
              <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {user.admin && (
                  <li>
                    <Link to="/admin">Správa webu</Link>
                  </li>
                )}
                <li>
                  <Link to="/logout">Odhlasit se</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-link text-neutral underline underline-offset-2 " to="/login">
              Přihlásit se
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

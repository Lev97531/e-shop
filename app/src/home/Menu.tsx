import { Link } from '@tanstack/react-router'
import { Route } from '../routes/_products'

export const Menu = () => {
  const { categories } = Route.useLoaderData()
  const { category } = Route.useSearch()

  const items = ['Item 1', 'Item 2', 'Item 3']

  return (
    <div>
      <ul className="menu bg-base-200 rounded-box w-46">
        <li>
          <h2 className="menu-title text-base-content">Kategorie</h2>
          <ul>
            <li>
              <Link className={category ? '' : 'menu-active'} to="/" search={(prev) => ({ ...prev, category: '', q: '' })}>
                Všechny
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  className={c === category ? 'menu-active' : ''}
                  to="/"
                  search={(prev) => ({ ...prev, category: c!, q: '' })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

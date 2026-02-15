import { Route } from '../routes/_products'

export const Menu = () => {
  const { categories } = Route.useLoaderData()

  const items = ['Item 1', 'Item 2', 'Item 3']

  return (
    <div>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <h2 className="menu-title text-primary-content">Kategorie</h2>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <a>{category}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

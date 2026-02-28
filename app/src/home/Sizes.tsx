import { Route } from '../routes/_products'

export const Sizes = () => {
  const { sizes } = Route.useLoaderData()
  const { size = [] } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <div>
      <ul className="menu bg-base-200 rounded-box w-46">
        <li>
          <h2 className="menu-title text-base-content">Rozměry</h2>
          <ul>
            {sizes.map((s) => (
              <li key={s}>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={size.includes(s!)}
                    onChange={(e) => {
                      const checked = e.target.checked
                      const checkedSize = sizes.filter((s) => size.includes(s!))
                      const newSize = checked ? [...checkedSize, s] : checkedSize.filter((c) => c !== s)

                      navigate({ search: (prev) => ({ ...prev, size: newSize }) })
                    }}
                  />
                  {s}
                </label>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

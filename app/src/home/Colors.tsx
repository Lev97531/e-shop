import { Route } from '../routes/_products'

export const Colors = () => {
  const { colors } = Route.useLoaderData()
  const { color = [] } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <div>
      <ul className="menu bg-base-200 rounded-box w-46">
        <li>
          <h2 className="menu-title text-primary-content">Barvy</h2>
          <ul>
            {colors.map((s) => (
              <li key={s}>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={color.includes(s!)}
                    onChange={(e) => {
                      const checked = e.target.checked
                      const checkedColor = colors.filter((s) => color.includes(s!))
                      const newColor = checked ? [...checkedColor, s] : checkedColor.filter((c) => c !== s)

                      navigate({ search: (prev) => ({ ...prev, color: newColor }) })
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

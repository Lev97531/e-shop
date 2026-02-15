import { useNavigate } from '@tanstack/react-router'
import { Route } from '../routes/_products'

export const sortNames = {
  Populární: 'popularni',
  Nejlevnější: 'nejlevnejsi',
  Nejdražší: 'nejdrazsi',
} as const

export const Sort = () => {
  const navigate = useNavigate()
  const { sort = sortNames.Populární } = Route.useSearch()

  return (
    <div className="self-end">
      <select
        className="select select-lg"
        value={sort}
        onChange={(e) => {
          const sort = e.target.value

          navigate({
            to: '/',
            search: (prev) => ({
              ...prev,
              sort,
            }),
          })
        }}
      >
        {Object.entries(sortNames).map(([name, value]) => (
          <option key={name} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

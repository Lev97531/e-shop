import { Route } from '~/routes/_products'
import { useSearch } from '~/shared/useSearch'

export const SearchProduct = () => {
  const routeSearch = Route.useSearch()
  const navigate = Route.useNavigate()

  const { search, setSearch } = useSearch({
    initialSearch: routeSearch.q,
    onSearchChange: (query) => navigate({ search: (prev) => ({ ...prev, q: query }) }),
  })

  return (
    <div className="leading-none">
      <input
        type="search"
        placeholder="Hledat podle jména..."
        className="input input-bordered min-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

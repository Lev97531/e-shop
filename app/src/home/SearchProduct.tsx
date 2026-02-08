import { useDebouncer } from '@tanstack/react-pacer'
import { useEffect, useState } from 'react'
import { Route } from '~/routes/_products'
import { MIN_SEARCH_QUERY_LENGTH, SEARCH_DEBOUNCE_TIME_MS } from '~/shared/consts'

export const SearchProduct = () => {
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const [query, setQuery] = useState(search.q)

  const debouncer = useDebouncer(
    (query?: string) => {
      navigate({ search: (prev) => ({ ...prev, q: query }) })
    },
    { wait: SEARCH_DEBOUNCE_TIME_MS },
  )

  useEffect(() => {
    if (query == search.q) {
      return
    }

    const q = (query ? query.length : 0) < MIN_SEARCH_QUERY_LENGTH ? '' : query

    debouncer.maybeExecute(q)
  }, [query])

  return (
    <div className="leading-none">
      <input
        type="search"
        placeholder="Search by name..."
        className="input input-bordered min-w-sm"
        value={query}
        onChange={(e) => {
          const value = e.target.value

          setQuery(value)
        }}
      />
    </div>
  )
}

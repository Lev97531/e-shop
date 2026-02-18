import { useDebouncer } from '@tanstack/react-pacer'
import { useEffect, useState } from 'react'
import { MIN_SEARCH_QUERY_LENGTH, SEARCH_DEBOUNCE_TIME_MS } from './consts'

interface UseSearchProps {
  onSearchChange: (query?: string) => void
  initialSearch?: string
}

export const useSearch = ({ onSearchChange, initialSearch = '' }: UseSearchProps) => {
  const [search, setSearch] = useState(initialSearch)

  const debouncer = useDebouncer(
    (searchQuery?: string) => {
      const query = (searchQuery ? searchQuery.length : 0) < MIN_SEARCH_QUERY_LENGTH ? '' : searchQuery
      onSearchChange(query)
    },
    { wait: SEARCH_DEBOUNCE_TIME_MS },
  )

  useEffect(() => {
    debouncer.maybeExecute(search)
  }, [search, debouncer])

  return { search, setSearch }
}

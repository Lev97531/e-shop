import { useCallback, useRef, useSyncExternalStore } from 'react'

const subscribers = new Set<() => void>()

const notifySubscribers = () => {
  subscribers.forEach((callback) => callback())
}

if (typeof window !== 'undefined') {
  addEventListener('storage', notifySubscribers)
}

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const subscribe = useCallback(
    (onStorageChange: () => void) => {
      subscribers.add(onStorageChange)

      return () => {
        subscribers.delete(onStorageChange)
      }
    },
    [subscribers]
  )

  const storedValueRef = useRef<{ json: string | null; parsed: T }>({
    json: null,
    parsed: defaultValue,
  })

  const getSnapshot = () => {
    const json = localStorage.getItem(key)
    if (json !== storedValueRef.current.json) {
      storedValueRef.current = {
        json,
        parsed: json ? (JSON.parse(json) as T) : defaultValue,
      }
    }

    return storedValueRef.current.parsed
  }

  const data = useSyncExternalStore(subscribe, getSnapshot, () => defaultValue)

  const saveToStorage = useCallback(
    (value: T) => {
      const json = JSON.stringify(value)
      localStorage.setItem(key, json)
      notifySubscribers()
    },
    [key]
  )

  return { data, saveToStorage }
}

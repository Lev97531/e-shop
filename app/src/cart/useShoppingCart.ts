import { useEffect, useSyncExternalStore } from 'react'
import { loadCartItems, shoppingCart } from './cart'

type Callback = () => void

const subscribers: Callback[] = []

export function notifyCartSubscribers() {
  subscribers.forEach((callback) => callback())
}

export function useShoppingCart() {
  useEffect(() => {
    loadCartItems()
  }, [])

  return useSyncExternalStore(
    (subscription) => subscribe(subscription),
    () => shoppingCart,
    () => shoppingCart
  )
}

function subscribe(callback: Callback) {
  subscribers.push(callback)
  return () => {
    unsubscribe(callback)
  }
}

function unsubscribe(callback: Callback) {
  const indexToDelete = subscribers.indexOf(callback)
  if (indexToDelete == -1) {
    return
  }

  subscribers.splice(subscribers.indexOf(callback), 1)
}

type Callback = () => void

const subscribers: Callback[] = []

function subscribe(callback: Callback) {
  subscribers.push(callback)
  return () => {
    subscribers.splice(subscribers.indexOf(callback), 1)
  }
}

function notify() {
  subscribers.forEach((callback) => callback())
}

export const cartStore = { subscribe, notify }

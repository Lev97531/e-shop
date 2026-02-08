import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { deleteCookie } from '@tanstack/react-start/server'

const logout = createServerFn().handler(async () => {
  deleteCookie('session')
})

export const Route = createFileRoute('/logout')({
  component: RouteComponent,
  loader: async () => {
    await logout()
    throw redirect({ to: '/' })
  },
})

function RouteComponent() {
  return <div>Hello "/logout"!</div>
}

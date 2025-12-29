import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthUser } from '~/auth/get-auth-user'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const user = await getAuthUser()
    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }

    console.log('Auth user:', user)
  },
})

function RouteComponent() {
  return <div>Hello "/admin"!</div>
}

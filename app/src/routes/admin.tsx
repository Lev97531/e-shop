import { createFileRoute, Outlet, redirect, Link } from '@tanstack/react-router'
import { getAuthUser } from '~/auth/get-auth-user'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const user = await getAuthUser()
    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
    if (!user.admin) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return (
    <div className="flex gap-6">
      <aside className="w-56 shrink-0">
        <nav className="menu bg-base-200 rounded-box p-2">
          <ul>
            <li>
              <Link to="/admin/products">Products</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
            <li>
              <Link to="/admin/orders">Orders</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

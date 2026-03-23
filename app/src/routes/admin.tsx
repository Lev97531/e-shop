import { createFileRoute, Outlet, redirect, Link } from '@tanstack/react-router'
import { getAuthUser } from '~/auth/get-auth-user'
import { Home } from 'lucide-react'

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
    <div className="flex gap-6 mt-5">
      <aside className="w-46 shrink-0">
        <nav className="menu bg-base-200 rounded-box p-2">
          <ul>
            <li>
              <Link to="/admin/products">Produkty</Link>
            </li>
            <li>
              <Link to="/admin/users">Uživatelé</Link>
            </li>
            <li>
              <Link to="/admin/orders">Objednávky</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1">
        <div className="breadcrumbs text-md">
          <ul>
            <li>
              <Link to="/">
                <Home /> Úvodní stránka
              </Link>
            </li>
            <li>Admin</li>
          </ul>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

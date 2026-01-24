import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <p className="opacity-70">User management coming soon.</p>
    </div>
  )
}

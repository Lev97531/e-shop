import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Objednávky</h1>
      <p className="opacity-70">Správa objednávek bude brzy k dispozici.</p>
    </div>
  )
}

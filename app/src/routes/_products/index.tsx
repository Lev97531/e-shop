import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_products/')({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}

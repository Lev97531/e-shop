import { createFileRoute, Link } from '@tanstack/react-router'
import { LoginForm } from '~/auth/login-form'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm />
}

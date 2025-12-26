import { createFileRoute } from '@tanstack/react-router'
import { RegistrationForm } from '~/auth/registration-form'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegistrationForm />
}

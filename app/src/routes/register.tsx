import { createFileRoute } from '@tanstack/react-router'
import { RegistrationForm } from '~/auth/registration-form'
import { searchSchema } from './login'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  return <RegistrationForm />
}

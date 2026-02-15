import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { LoginForm } from '~/auth/login-form'

export const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  const navigate = useNavigate()

  const search = Route.useSearch()
  const redirect = search.redirect
  return (
    <LoginForm
      onLogin={async () => {
        if (redirect) {
          location.href = redirect
          return
        }

        navigate({ to: '/' })
      }}
    />
  )
}

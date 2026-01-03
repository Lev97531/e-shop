import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { LoginForm } from '~/auth/login-form'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  validateSearch: (search) => ({
    redirect: search.redirect as string | undefined,
  }),
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

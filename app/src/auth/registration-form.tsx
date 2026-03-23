import { useForm } from '@tanstack/react-form'
import { Link, redirect, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { FieldError } from '../components/FieldError'
import { register } from './registration'
import { login } from './login'
import { Route } from '~/routes/register'

export const registrationSchema = z
  .object({
    email: z.email('Neplatná e-mailová adresa'),
    password: z.string().min(8, 'Příliš malý: očekávaný řetězec má >=8 znaků'),
    confirmPassword: z.string().min(8, 'Příliš malý: očekávaný řetězec má >=8 znaků'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hesla se neshodují',
    path: ['confirmPassword'],
  })

export function RegistrationForm() {
  const navigate = useNavigate()
  const { redirect } = Route.useSearch()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: registrationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await register({ data: value })
        await login({ data: value })

        if (redirect) {
          location.href = redirect
          return
        }

        navigate({ to: '/' })
      } catch (error) {
        toast.error((error as Error).message)
      }
    },
  })

  return (
    <div>
      <div className="hero h-full py-40">
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-md shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <form.Field
                  name="email"
                  children={(field) => (
                    <>
                      <label className="label">Email</label>
                      <input
                        type="email"
                        className="input w-full"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError field={field} />
                    </>
                  )}
                />
                <form.Field
                  name="password"
                  children={(field) => (
                    <>
                      <label className="label">Heslo</label>
                      <input
                        type="password"
                        className="input w-full"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError field={field} />
                    </>
                  )}
                />
                <form.Field
                  name="confirmPassword"
                  children={(field) => (
                    <>
                      <label className="label">Potvrdit heslo</label>
                      <input
                        type="password"
                        className="input w-full"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError field={field} />
                    </>
                  )}
                />
                <button
                  className="btn btn-neutral mt-4"
                  onClick={() => {
                    form.handleSubmit()
                  }}
                >
                  Zaregistrovat se
                </button>
              </fieldset>
              <fieldset className="fieldset">
                <div>
                  <span>Už máte účet? </span>
                  <Link className="link link-hover" to={'/login'} search={(prev) => ({ ...prev })}>
                    Přihlásit se
                  </Link>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { register } from './registration'
import { toast } from 'sonner'
import { Route } from '../routes/register'
import { useNavigate } from '@tanstack/react-router'

export const registrationSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // error shows on confirmPassword field
  })

export function RegistrationForm() {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: 'bebebe@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
    },
    validators: {
      onChange: registrationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await register({ data: value })
        navigate({ to: '/', search: { success: undefined } })
      } catch (error) {
        toast.error((error as Error).message)
      }
    },
  })

  return (
    <div>
      <div className="hero bg-base-200 h-full py-40">
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
                      {!field.state.meta.isValid && (
                        <em className="text-error">{field.state.meta.errors.map((error) => error?.message).join(',')}</em>
                      )}
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
                      {!field.state.meta.isValid && (
                        <em className="text-error">{field.state.meta.errors.map((error) => error?.message).join(',')}</em>
                      )}
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
                      {!field.state.meta.isValid && (
                        <em className="text-error">{field.state.meta.errors.map((error) => error?.message).join(',')}</em>
                      )}
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
                  <a className="link link-hover" href="/login">
                    Přihlásit se
                  </a>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

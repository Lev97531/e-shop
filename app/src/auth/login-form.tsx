import { useForm } from '@tanstack/react-form'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { FieldError } from '~/components/FieldError'
import { login } from './login'

export const loginSchema = z.object({
  email: z.email('Neplatná e-mailová adresa'),
  password: z.string().min(8, 'Příliš malý: očekávaný řetězec má >=8 znaků'),
})

export function LoginForm({onLogin}: { onLogin: () => Promise<void> }) {
  const form = useForm({
    defaultValues: {
      email: 'bebebe@gmail.com',
      password: '12345678',
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await login({ data: value })
        await onLogin()
      } catch (error) {
        console.error(error)
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
                <div>
                  <a className="link link-hover">Zapomenuté heslo?</a>
                </div>
                <button
                  className="btn btn-neutral mt-4"
                  onClick={() => {
                    form.handleSubmit()
                  }}
                >
                  Přihlásit se
                </button>
              </fieldset>
              <fieldset className="fieldset">
                <div>
                  <span>Nemáte účet? </span>
                  <Link className="link link-hover" to={'/register'}>
                    Zaregistrovat se
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

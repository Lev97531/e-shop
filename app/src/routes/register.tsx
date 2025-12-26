import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="hero bg-base-200 h-full py-40">
        <div className="hero-content flex-col">
          <div className="card bg-base-100 w-md shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input w-full" />
                <label className="label">Heslo</label>
                <input type="password" className="input w-full" />
                <label className="label">Potvrdit heslo</label>
                <input type="password" className="input w-full" />
                <button className="btn btn-neutral mt-4">Zaregistrovat se</button>
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

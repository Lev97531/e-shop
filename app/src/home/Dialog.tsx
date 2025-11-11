import { PropsWithChildren } from 'react'

export const Dialog = ({ children }: PropsWithChildren) => {
  return (
    <dialog id="shopping-cart" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {children}
      </div>
    </dialog>
  )
}

import { useNavigate } from '@tanstack/react-router'
import { PropsWithChildren } from 'react'

export const ProductDetailsDialog = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  return (
    <dialog id="product-details" className="modal" open>
      <div className="modal-box min-w-2xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            navigate({ to: '..' })
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  )
}

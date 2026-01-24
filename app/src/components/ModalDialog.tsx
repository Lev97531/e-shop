import { useNavigate } from '@tanstack/react-router'
import { HTMLAttributes, PropsWithChildren, useCallback, useEffect, useRef } from 'react'

export const ModalDialog = ({
  children,
  dialogClass,
  closeTo,
}: PropsWithChildren<{
  dialogClass?: HTMLAttributes<HTMLDivElement>['className']
  closeTo?: string
}>) => {
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!dialogRef.current) {
      return
    }

    if (!dialogRef.current.open) {
      dialogRef.current.showModal()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={() => {
        navigate({ to: closeTo || '..' })
      }}
    >
      <div className={`modal-box ${dialogClass || 'min-w-2xl'}`}>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => {
            dialogRef.current?.close()
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  )
}

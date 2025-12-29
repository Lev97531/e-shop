import { createFileRoute } from '@tanstack/react-router'
import { PropsWithChildren } from 'react'
import { ModalDialog } from '~/components/modalDialog'
import { Cart } from '~/home/Cart'

export const Route = createFileRoute('/_products/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ModalDialog>
      <div className="text-4xl font-bold">Košík</div>
      <Cart />
    </ModalDialog>
  )
}

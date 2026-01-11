import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useShoppingCart } from '~/cart/useShoppingCart'

export const Route = createFileRoute('/_products/order-success')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    toast(
      <div className="text-5xl flex flex-col gap-4">
        <div>Děkujeme za nakup!</div>
        <div className="mx-auto text-7xl">🎉</div>
      </div>,
      { duration: 10_000 }
    )
    clearCart()
    navigate({ to: '/' })
  }, [])

  return null
}

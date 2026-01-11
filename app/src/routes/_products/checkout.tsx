import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { getAuthUser } from '~/auth/get-auth-user'
import { checkout } from '~/cart/checkout'
import { useShoppingCart } from '~/cart/useShoppingCart'

export const Route = createFileRoute('/_products/checkout')({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await getAuthUser()
    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
  },
})

function RouteComponent() {
  const { products } = useShoppingCart()
  const navigate = useNavigate()

  const doCheckout = async () => {
    if (products.length === 0) {
      return
    }

    const url = await checkout({ data: { products } })

    if (url !== null) {
      window.location.href = url
      return
    }

    toast.error('Nepodarilo se odeslat zákazku.')
    navigate({ to: '/' })
  }

  useEffect(() => {
    doCheckout()
  }, [])

  return null
}

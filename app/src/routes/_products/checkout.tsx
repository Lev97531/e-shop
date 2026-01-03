import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { getAuthUser } from '~/auth/get-auth-user'
import { cartLoaded } from '~/cart/cart'
import { checkout, CheckoutItem } from '~/cart/checkout'
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
  const shoppingCart = useShoppingCart()
  const navigate = useNavigate()

  const doCheckout = async () => {
    await cartLoaded.promise

    console.log('products:', shoppingCart.products)
    if (shoppingCart.products.length === 0) {
      return
    }

    const products = shoppingCart.products.map(
      (product) => ({ id: product.product.id, quantity: product.quantity } as CheckoutItem)
    )
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
  }, [shoppingCart])

  return null
}

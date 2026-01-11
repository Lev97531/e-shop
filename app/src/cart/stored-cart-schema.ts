import { z } from 'zod'
import { cartSettings } from './stored-cart-settings'

const productInCartSchema = z.object({
  id: z.number(),
  quantity: z.number().int().min(1).max(cartSettings.maxProductQuantity),
})

export type ProductInCart = z.infer<typeof productInCartSchema>

export const storedCartSchema = z
  .object({
    version: z.string(),
    expiresAt: z.iso.datetime(),
    products: z.array(productInCartSchema),
  })
  .refine(
    ({ version }) => {
      return version === cartSettings.localStorageVersion
    },
    { error: 'Invalid cart version', path: ['version'] }
  )
  .refine(
    ({ expiresAt }) => {
      return new Date(expiresAt) > new Date()
    },
    { error: 'Cart has expired', path: ['expiresAt'] }
  )

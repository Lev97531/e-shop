import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import z from 'zod'
import { ModalDialog } from '~/components/ModalDialog'
import { ProductDetails } from '~/home/product-details/ProductDetails'

const loadProductSchema = z.object({
  productSlug: z.string(),
})

export const loadProduct = createServerFn()
  .inputValidator(loadProductSchema)
  .handler(async ({ data: { productSlug } }) => {
    const product = await prisma.product.findUnique({ where: { slug: productSlug }, include: { attributes: true } })
    if (!product) {
      throw notFound()
    }

    return product
  })

export const Route = createFileRoute('/_products/$productSlug')({
  component: RouteComponent,
  loader: async ({ params: { productSlug } }) => {
    return await loadProduct({ data: { productSlug } })
  },
  notFoundComponent: () => <ModalDialog>Produkt neexistuje</ModalDialog>,
})

function RouteComponent() {
  const product = Route.useLoaderData()

  return (
    <ModalDialog dialogClass="max-w-4xl">
      <ProductDetails product={product} />
    </ModalDialog>
  )
}

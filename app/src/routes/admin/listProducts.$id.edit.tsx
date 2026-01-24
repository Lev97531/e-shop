import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { z } from 'zod'
import { ProductForm } from '~/admin/ProductForm'
import { ModalDialog } from '~/components/ModalDialog'

export const getProductById = createServerFn()
  .inputValidator(z.object({ id: z.number() }))
  .handler(async ({ data: { id } }) => {
    const product = await prisma.product.findUnique({ where: { id }, include: { attributes: true } })
    if (!product) {
      throw new Error('Product not found')
    }

    return product
  })

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const Route = createFileRoute('/admin/listProducts/$id/edit')({
  params: {
    parse: paramsSchema.parse,
  },
  loader: async ({ params: { id } }) => {
    const product = await getProductById({ data: { id } })
    return product
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const product = Route.useLoaderData()

  return (
    <ModalDialog dialogClass="min-w-xl" closeTo="../..">
      <ProductForm
        product={product}
        onSuccess={() => {
          navigate({ to: '../..', reloadDocument: true })
        }}
      />
    </ModalDialog>
  )
}

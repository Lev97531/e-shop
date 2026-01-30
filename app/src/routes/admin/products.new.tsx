import { createFileRoute } from '@tanstack/react-router'
import { ProductForm } from '~/admin/ProductForm'
import { ModalDialog } from '~/components/ModalDialog'

export const Route = createFileRoute('/admin/products/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  return (
    <ModalDialog dialogClass="min-w-xl" closeTo="..">
      <ProductForm
        product={{
          id: 0,
          slug: '',
          name: '',
          priceCents: 0,
          description: '',
          imageUrl: null,
          attributes: {
            productId: 0,
            rating: null,
            isAvailable: true,
            isOnSale: false,
            isNew: false,
            category: null,
            size: null,
            color: null,
          },
        }}
        onSuccess={() => navigate({ to: '..', reloadDocument: true })}
      />
    </ModalDialog>
  )
}

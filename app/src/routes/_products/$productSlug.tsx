import { createFileRoute } from '@tanstack/react-router'
import { ModalDialog } from '~/components/modalDialog'

export const Route = createFileRoute('/_products/$productSlug')({
  component: RouteComponent,
  loader: async ({ params: { productSlug } }) => {
    console.log(productSlug)
    // return { products: await loadProducts() }
  },
})

function RouteComponent() {
  const { productSlug } = Route.useParams()

  return <ModalDialog>productSlug: {productSlug}</ModalDialog>
}

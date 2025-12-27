import { createFileRoute } from '@tanstack/react-router'
import { ProductDetailsDialog } from '~/home/product-details/ProductDetailsDialog'

export const Route = createFileRoute('/_products/$productSlug')({
  component: RouteComponent,
  loader: async ({ params: { productSlug } }) => {
    console.log(productSlug)
    // return { products: await loadProducts() }
  },
})

function RouteComponent() {
  const { productSlug } = Route.useParams()

  return <ProductDetailsDialog>productSlug: {productSlug}</ProductDetailsDialog>
}

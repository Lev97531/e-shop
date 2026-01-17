import { Route } from '../routes/admin/listProducts'

export const ProductsTable = () => {
  const { products } = Route.useLoaderData()
  return (
    <div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="w-8">ID</th>
            <th>Name</th>
            <th className="w-16">Price</th>
            <th className="w-8">Availability</th>
            <th className="w-8">On Sale</th>
            <th className="w-8">Is New</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th>{product.id}</th>
              <td>{product.name}</td>
              <td>{product.priceCents}</td>
              <td className="text-center">{product.attributes?.isAvailable ? '✅' : '❌'}</td>
              <td className="text-center">{product.attributes?.isOnSale ? '✅' : '❌'}</td>
              <td className="text-center">{product.attributes?.isNew ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

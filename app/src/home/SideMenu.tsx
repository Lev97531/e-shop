import { Route } from '~/routes'
import { CategoryTreeItem } from './get-categories-tree'

export const SideMenu = () => {
  // const { categoriesTree } = Route.useLoaderData()
  const categoriesTree = [
    { id: '1', name: 'Tablets', children: [] },
    { id: '2', name: 'Phones', children: [] },
    { id: '3', name: 'Laptops', children: [] },
  ] as CategoryTreeItem[]

  console.log('tree:', JSON.stringify(categoriesTree, undefined, 2))
  return (
    <div className="w-48 bg-[#3b3b66]">
      <ul className="menu bg-base-200 rounded-box w-full">
        {categoriesTree.map((category) => (
          <li key={category.id}>
            <a href={`./${sanitizeName(category.name)}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function sanitizeName(name: string) {
  return name.toLowerCase().replace(' ', '-')
}

import { prisma } from 'prisma'

type CategoryTreeItem = {
  id: string
  name: string
  children: CategoryTreeItem[]
}

export const getCategoriesTree = async () => {
  const categoriesTree = ((await prisma.categoriesTree.findFirst())?.json as CategoryTreeItem[]) || []
  return categoriesTree
}

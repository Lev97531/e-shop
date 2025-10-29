import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getCategoriesTree } from '~/home/get-categories-tree'
import { Layout } from '../home/Layout'

const getLoaderData = createServerFn().handler(async () => {
  return { categoriesTree: await getCategoriesTree() }
})

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => getLoaderData(),
})

function Home() {
  return 123
}

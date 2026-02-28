import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import Fuse from 'fuse.js'
import { prisma } from 'prisma'
import { includes, z } from 'zod'
import { UsersTable } from '~/admin/UsersTable'
import { useSearch } from '~/shared/useSearch'

const userListPageSize = 10

const loadUserSchema = z.object({
  page: z.number(),
  q: z.coerce.string().optional(),
})

const searchSchema = z.object({
  page: z.number().optional(),
  q: z.coerce.string().optional(),
})

const loadUsers = createServerFn()
  .inputValidator(loadUserSchema)
  .handler(async ({ data: { page, q } }) => {
    const skip = (page - 1) * userListPageSize

    const query = q?.trim()

    if (query) {
      const allUsers = await prisma.user.findMany({ select: { id: true, email: true } })
      const fuse = new Fuse(allUsers, {
        keys: ['email'],
        threshold: 0.4,
        ignoreLocation: true,
      })
      const matched = fuse.search(query).map((r) => r.item)
      const matchedIds = matched.map((u) => u.id)
      const count = matched.length
      const totalPages = Math.max(1, Math.ceil(count / userListPageSize))
      const users = await prisma.user.findMany({
        where: { id: { in: matchedIds.slice(skip, skip + userListPageSize) } },
        include: { admin: true },
      })
      return { users, totalPages }
    }

    const users = await prisma.user.findMany({ take: userListPageSize, skip, include: { admin: true } })
    const count = await prisma.user.count()

    const totalPages = Math.ceil(count / userListPageSize)

    return { users, totalPages }
  })

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({
    deps: {
      search: { page = 1, q },
    },
  }) => {
    const { users, totalPages } = await loadUsers({ data: { page, q } })

    const prevPage = page > 1 ? page - 1 : null
    const nextPage = page < totalPages ? page + 1 : null

    return { users, page, totalPages, prevPage, nextPage }
  },
})

function RouteComponent() {
  const { totalPages, prevPage, nextPage, page } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const routeSearch = Route.useSearch()

  const { search, setSearch } = useSearch({
    initialSearch: routeSearch.q,
    onSearchChange: (query) =>
      navigate({
        to: '/admin/users',
        search: (prev) => ({ ...prev, q: query, page: 1 }),
      }),
  })
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex gap-4">
        <input
          type="search"
          placeholder="Search by email..."
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <UsersTable />
      <div className="flex items-center justify-center gap-3">
        {prevPage ? (
          <Link className="btn btn-primary" to="/admin/users" search={{ page: prevPage, q: routeSearch.q }}>
            Prev
          </Link>
        ) : (
          <button className="btn btn-primary btn-disabled" aria-disabled>
            Prev
          </button>
        )}
        <div className="opacity-80">
          Page {page} of {totalPages}
        </div>
        {nextPage ? (
          <Link className="btn btn-primary" to="/admin/users" search={{ page: nextPage, q: routeSearch.q }}>
            Next
          </Link>
        ) : (
          <button className="btn btn-primary btn-disabled" aria-disabled>
            Next
          </button>
        )}
      </div>
    </div>
  )
}

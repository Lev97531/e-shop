import { Route } from '../routes/admin/users'

export const UsersTable = () => {
  const { users } = Route.useLoaderData()
  return (
    <div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="w-8">ID</th>
            <th>Email</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>{user.id}</th>
              <td>{user.email}</td>
              <td>{user.admin ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

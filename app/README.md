# E-Shop App

## Npm Scripts

- `dev` - Starts development server. It monitors file changes and reloads running program parts.
- `build` - Produces production output which could be deployed to the web server.

### Prisma related

- `db-generate` - Generates Prisma client based on the schema defined in `schema.prisma`. This script is used after making changes to the schema.
- `db-reset` - Resets the database by dropping all tables and sequences. This script is used when the database needs to be reinitialized. It also calls migrate.
- `db-migrate` - Applies pending database migrations. This script is used when the database schema needs to be updated. It also calls seed.
- `db-seed` - Seeds the database with initial data. This script is used to populate the database with initial data.
- `db-pull` - Pulls the database schema from the database and updates the `schema.prisma` file. This script is used when the database schema needs to be synchronized with the codebase.

## Troubleshooting

After pulling schema from the database `db-pull`,
generating Prisma client with `db-generate` fails with

```
Error:
Union types array can not be empty
```

Manually replace `Unsupported("")?` to `Json?` in `prisma/schema.prisma` file.

```diff
--- prisma/schema.prisma
+++ prisma/schema.prisma
 view CategoriesTree {
-  json Unsupported("")?
+  json Json?
 }
```

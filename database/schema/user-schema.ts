import * as t from 'drizzle-orm/pg-core'
import type { UserRoles } from '../../src/@types/user-roles.ts'

export const userSchema = t.pgTable("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  password: t.text().notNull(),
  role: t.text().$type<UserRoles>().notNull().default("student"),
})
import * as t from 'drizzle-orm/pg-core'
import type { UserRules } from '../../src/@types/user-rules.ts'

export const userSchema = t.pgTable("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.text().notNull(),
  email: t.text().notNull(),
  password: t.text().notNull(),
  role: t.text().$type<UserRules>().notNull().default("student"),
})
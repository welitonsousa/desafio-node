import * as t from 'drizzle-orm/pg-core'

export const userSchema = t.pgTable("users", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: t.text().notNull(),
  email: t.text().notNull(),
})
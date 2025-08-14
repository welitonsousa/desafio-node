import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const courseSchema = pgTable("courses", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: t.text().notNull(),
  description: t.text(),
});

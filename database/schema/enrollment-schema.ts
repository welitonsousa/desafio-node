import * as t from 'drizzle-orm/pg-core'
import { userSchema } from './user-schema.ts'
import { courseSchema } from './course-schema.ts'

export const enrollmentSchema = t.pgTable('enrollments', {
  id: t.integer().primaryKey().generatedByDefaultAsIdentity(),
  userId: t.integer().notNull().references(() => userSchema.id),
  courseId: t.integer().notNull().references(() => courseSchema.id),
  createdAt: t.date().defaultNow(),
}, (table) => [
  t.uniqueIndex('user_course_unique').on(table.userId, table.courseId)
])

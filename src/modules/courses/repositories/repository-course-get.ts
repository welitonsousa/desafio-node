import { and, eq, ilike, SQL } from "drizzle-orm"
import { db } from "../../../../database/instance.ts"
import { courseSchema } from "../../../../database/schema/course-schema.ts"

export async function repositoryCourseGet(filters?: {
  q?: string
  page: number
  limit: number
}) {
  const conditions: SQL[] = []
  if (filters?.q) conditions.push(ilike(courseSchema.title, `%${filters.q}%`))
  const page = filters?.page ?? 1
  const limit = filters?.limit ?? 20

  const [list, count] = await Promise.all([
    db.select()
      .from(courseSchema)
      .where(and(...conditions)).offset((page - 1) * limit).limit(limit),
    db.$count(courseSchema, and(...conditions)),
  ])
  return { result: list, count }
}
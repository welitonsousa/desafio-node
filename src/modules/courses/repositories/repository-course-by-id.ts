import { eq } from "drizzle-orm"
import { db } from "../../../../database/instance.ts"
import { courseSchema } from "../../../../database/schema/course-schema.ts"

export async function repositoryCourseById(id: number) {
  const res = await db.select().from(courseSchema).where(eq(courseSchema.id, id))
  if (res.length === 0) {
    return null
  }
  return res[0]
}
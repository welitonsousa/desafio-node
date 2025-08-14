import z from "zod"
import { courseSchema } from "../../../../database/schema/course-schema.ts"
import { courseValidations } from "../course-validations.ts"
import { db } from "../../../../database/instance.ts"


export async function repositoryCourseCreate(data: z.infer<typeof courseValidations.request.create>) {
  const res = await db.insert(courseSchema).values({
    title: data.title,
    description: data.description,
  }).returning()
  return res[0]
}


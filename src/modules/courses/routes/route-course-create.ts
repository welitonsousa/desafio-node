import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { courseValidations } from "../course-validations.ts"
import { repositoryCourseCreate } from "../repositories/repository-course-create.ts"

export const routeCourseCreate: FastifyPluginAsyncZod = async (server) => {
  server.post('/courses', {
    schema: {
      tags: ['courses'],
      body: courseValidations.create.body,
      response: courseValidations.create.response,
    }
  }, async (req, res) => {
    const course = await repositoryCourseCreate(req.body)
    return res.send(course)
  })
}
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courseValidations } from "../course-validations.ts";
import { repositoryCourseById } from "../repositories/repository-course-by-id.ts";

export const routeCourseById: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses/:id', {
    schema: {
      tags: ['courses'],
      response: courseValidations.getById.response,
      params: courseValidations.getById.params
    }
  }, async (req, res) => {
    const course = await repositoryCourseById(req.params.id)
    return res.send(course)
  })
}
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { repositoryCourseGet } from "../repositories/repository-course-get.ts";
import { courseValidations } from "../course-validations.ts";

export const routeCourseGet: FastifyPluginAsyncZod = async (server) => {
  server.get('/courses', {
    schema: {
      tags: ['courses'],
      response: courseValidations.get.response,
      querystring: courseValidations.get.queryParams,
    }
  }, async (req, res) => {
    const courses = await repositoryCourseGet({
      limit: req.query.limit,
      page: req.query.page,
      q: req.query.q
    })
    return res.send({
      result: courses.result,
      page: req.query.page,
      total: courses.count,
    })
  })
}
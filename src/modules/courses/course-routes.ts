import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { routeCourseCreate } from "./routes/route-course-create.ts"
import { routeCourseGet } from "./routes/route-course-get.ts"
import { routeCourseById } from "./routes/route-course-get-by-id.ts"


export const courseRoutes: FastifyPluginAsyncZod = async (server) => {
  server.register(routeCourseCreate)
  server.register(routeCourseById)
  server.register(routeCourseGet)
}


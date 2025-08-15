import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { routeUserMe } from "./routes/route-user-me.ts";
import { routeUserCreate } from "./routes/route-user-create.ts";

export const userRoutes: FastifyPluginAsyncZod = async (server) => {
  server.register(routeUserMe)
  server.register(routeUserCreate)
}

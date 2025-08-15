import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { routeAuth } from "./routes/route-auth.ts";

export const authRoutes: FastifyPluginAsyncZod = async (server) => {
  server.register(routeAuth);
};

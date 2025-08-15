import fastify from "fastify";
import { SignedUser } from "./signed-user.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: SignedUser;
  }
}

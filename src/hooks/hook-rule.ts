import type { FastifyReply, FastifyRequest } from "fastify";
import { userByReq } from "./hook-signed.ts";
import { UserRoles } from "../@types/user-roles.ts";


export const hookRole = (role: UserRoles) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = userByReq(req);
      if (user?.role !== role) {
        return reply.status(403).send();
      }
    } catch (error) {
      return reply.status(403).send();
    }
  }
}
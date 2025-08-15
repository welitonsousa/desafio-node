import type { FastifyReply, FastifyRequest } from "fastify";
import { userByReq } from "./hook-signed.ts";
import { UserRules } from "../@types/user-rules.js";


export const hookRule = (rule: UserRules) => {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const user = userByReq(req);
      if (user?.rule !== 'admin') {
        return reply.status(403).send();
      }
    } catch (error) {
      return reply.status(403).send();
    }
  }
}
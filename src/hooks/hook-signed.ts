import type { FastifyReply, FastifyRequest } from "fastify";
import type { SignedUser } from "../@types/signed-user.ts";
import { ENV } from "../constants/env.ts";
import jwt from "jsonwebtoken";


export async function hookSigned(req: FastifyRequest, reply: FastifyReply) {
  const token = req.headers.authorization
  if (!token) return reply.status(401).send();

  try {
    const user = jwt.verify(token, ENV.JWT_SECRET) as SignedUser
    req.user = user;
  } catch (error) {
    return reply.status(401).send();
  }
}

export function userByReq(req: FastifyRequest): SignedUser {
  if (req.user) return req.user;
  throw new Error("User not found");
}
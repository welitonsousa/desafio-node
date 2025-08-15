import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { userValidations } from "../user-validations.ts";
import { hookSigned, userByReq } from "../../../hooks/hook-signed.ts";

export const routeUserMe: FastifyPluginAsyncZod = async (server) => {
  server.get('/me', {

    preHandler: [hookSigned],
    schema: {
      response: userValidations.me.response,
      tags: ['user']
    }
  }, async (req, res) => {

    const user = userByReq(req)
    return res.status(200).send({
      email: user.email,
      id: user.id,
      name: user.name,
      role: user.rule,
    });
  })
}
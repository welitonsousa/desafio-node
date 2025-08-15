import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import type { SignedUser } from "../../../@types/signed-user.ts";
import { authValidations } from "../auth-validations.ts";
import { repositoryUserGet } from "../../user/repositories/repository-user-get.ts";
import { ENV } from "../../../constants/env.ts";
import { verifySafe } from "../../../@types/argon-verify.ts";
import jwt from "jsonwebtoken";

export const routeAuth: FastifyPluginAsyncZod = async (server) => {
  server.post('/sign', {
    schema: {
      tags: ['auth'],
      body: authValidations.sign.body,
      response: authValidations.sign.response,
    }
  }, async (req, res) => {
    const { email, password } = req.body;

    const user = await repositoryUserGet({ email })
    if (!user) return res.status(400).send({ message: "Email ou senha inválidos" })

    const matchPassword = await verifySafe(user.password, password)
    if (!matchPassword) return res.status(400).send({ message: "Email ou senha inválidos" })


    const payload: SignedUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    }
    const token = jwt.sign(payload, ENV.JWT_SECRET)
    return res.status(200).send({ token });
  })
}
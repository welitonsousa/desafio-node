import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { userValidations } from "../user-validations.ts";
import { repositoryUserCreate } from "../repositories/repository-user-create.ts";
import { hash } from "argon2";

export const routeUserCreate: FastifyPluginAsyncZod = async (server) => {
  server.post('/users', {
    schema: {
      body: userValidations.create.body,
      response: userValidations.create.response,
      tags: ['user'],
    }
  }, async (req, res) => {
    try {
      await repositoryUserCreate({
        email: req.body.email,
        name: req.body.name,
        password: await hash(req.body.password),
        role: req.body.rule,
      });
    } catch (e) {
      return res.status(422).send({ message: 'Este usuário já existe' })
    }
    return res.send();
  });
};

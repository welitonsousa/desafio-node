import z from "zod";
import { userRulesArray } from "../../@types/user-rules.ts";

export const userValidations = {
  me: {
    response: {
      200: z.object({
        id: z.number(),
        name: z.string(),
        email: z.email(),
        role: z.enum(userRulesArray),
      })
    }
  },
  create: {
    body: z.object({
      email: z.email(),
      name: z.string().min(2).max(100),
      password: z.string().min(6).max(100),
      rule: z.enum(userRulesArray).default('student'),
    }),
    response: {
      200: z.null(),
      422: z.object({
        message: z.string()
      })
    }
  }
};
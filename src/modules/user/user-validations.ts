import z from "zod";
import { userRolesArray } from "../../@types/user-roles.ts";

export const userValidations = {
  me: {
    response: {
      200: z.object({
        id: z.number(),
        name: z.string(),
        email: z.email(),
        role: z.enum(userRolesArray),
      })
    }
  },
  create: {
    body: z.object({
      email: z.email(),
      name: z.string().min(2).max(100),
      password: z.string().min(6).max(100),
      role: z.enum(userRolesArray).default('student'),
    }),
    response: {
      200: z.null(),
      409: z.object({
        message: z.string()
      })
    }
  }
};
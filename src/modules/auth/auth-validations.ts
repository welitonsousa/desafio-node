import z from "zod";

export const authValidations = {
  sign: {
    body: z.object({
      email: z.email(),
      password: z.string().min(6).max(100)
    }),
    response: {
      200: z.object({
        token: z.string()
      }),
      400: z.object({
        message: z.string()
      })
    }
  }
}
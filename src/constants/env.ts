import z from "zod";

export const ENV = z.object({
  ENV: z.enum(["development", "production", "test"]),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(10).max(100),
}).parse(process.env)




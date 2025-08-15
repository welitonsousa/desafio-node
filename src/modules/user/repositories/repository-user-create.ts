import type { UserRules } from "../../../@types/user-rules.ts";
import { db } from "../../../../database/instance.ts";
import { userSchema } from "../../../../database/schema/user-schema.ts";

export async function repositoryUserCreate(data: {
  name: string;
  email: string;
  role: UserRules;
  password: string;
}) {
  await db.insert(userSchema).values({
    email: data.email,
    name: data.name,
    role: data.role,
    password: data.password,
  })
}
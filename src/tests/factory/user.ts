import { faker } from "@faker-js/faker";
import { db } from "../../../database/instance.ts";
import { userSchema } from "../../../database/schema/user-schema.ts";
import { hash } from "argon2";
import { ENV } from "../../constants/env.ts";
import jwt from "jsonwebtoken";
import { SignedUser } from "../../@types/signed-user.js";

export async function factoryUser() {
  const password = faker.internet.password();
  const res = await db.insert(userSchema).values({
    email: faker.internet.email(),
    password: await hash(password),
    name: faker.person.fullName(),
  }).returning()
  return { ...res[0], password, }
}

export async function factoryUserToken() {
  const user = await factoryUser();
  const payload: SignedUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }
  const token = jwt.sign(payload, ENV.JWT_SECRET);
  return { ...user, token };
}
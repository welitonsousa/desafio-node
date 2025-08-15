import { expect, test } from "vitest";
import { app } from "../../../app.ts";
import { fakerPT_BR as faker } from "@faker-js/faker";
import rest from 'supertest'

test('route create user', async () => {
  await app.ready()
  const email = faker.internet.email()

  const user = await rest(app.server).post('/users').send({
    name: faker.person.fullName(),
    password: '123456',
    role: 'student',
    email,
  });
  expect(200).toBe(user.statusCode);

  const userExistent = await rest(app.server).post('/users').send({
    name: faker.person.fullName(),
    password: '123456',
    role: 'student',
    email,
  });
  expect(409).toBe(userExistent.statusCode);
});


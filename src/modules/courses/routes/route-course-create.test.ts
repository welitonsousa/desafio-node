import { expect, test } from "vitest";
import { app } from "../../../app.ts";
import { fakerPT_BR as faker } from '@faker-js/faker'
import rest from "supertest";



test('route course create', async (t) => {
  await app.ready()
  const res = await rest(app.server).post('/courses').send({
    description: faker.lorem.text(),
    title: faker.lorem.words(3),
  })

  expect(res.statusCode).toBe(200)
  expect(res.body).toStrictEqual({
    id: expect.any(Number),
    title: expect.any(String),
    description: expect.any(String)
  })
})

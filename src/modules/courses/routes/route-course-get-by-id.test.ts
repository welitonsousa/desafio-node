import { expect, test } from "vitest";
import { app } from "../../../app.ts";
import { repositoryCourseCreate } from "../repositories/repository-course-create.ts";
import { fakerPT_BR as faker } from "@faker-js/faker";
import rest from "supertest";

test('route course get by id', async (t) => {
  await app.ready()
  const course = await repositoryCourseCreate({
    description: faker.lorem.paragraph(),
    title: faker.lorem.words(3),
  })

  const res = await rest(app.server).get(`/courses/${course.id}`)
  expect(res.statusCode).toBe(200)
  expect(res.body).toStrictEqual({
    id: expect.any(Number),
    title: expect.any(String),
    description: expect.any(String)
  })
})
import { test, expect } from 'vitest'
import { app } from '../../../app.ts'
import { repositoryCourseCreate } from '../repositories/repository-course-create.ts'
import { fakerPT_BR as faker } from '@faker-js/faker'
import rest from 'supertest'

test('get course route', async (t) => {
  await app.ready()
  await repositoryCourseCreate({
    description: faker.lorem.paragraph(),
    title: faker.lorem.words(3),
  })

  const res = await rest(app.server).get('/courses')

  expect(res.statusCode).toBe(200)

  expect(res.body).toStrictEqual({
    page: expect.any(Number),
    total: expect.any(Number),
    result: expect.arrayContaining([expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      description: expect.any(String)
    })])
  })
})
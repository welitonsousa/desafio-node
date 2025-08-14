import z from 'zod'

const _course = z.object({
  id: z.int(),
  title: z.string(),
  description: z.string().nullable(),
})


export const courseValidations = {
  get: {
    queryParams: z.object({
      q: z.string().min(2).max(100).optional(),
      page: z.coerce.number().min(1).optional().default(1),
      limit: z.coerce.number().min(1).optional().default(20),
    }),
    response: {
      200: z.object({
        page: z.number(),
        total: z.number(),
        result: z.array(_course)
      }),
    }
  },
  getById: {
    params: z.object({ id: z.coerce.number() }),
    response: {
      200: _course,
      404: z.null(),
    }
  },
  create: {
    body: z.object({
      title: z.string(),
      description: z.string().nullable()
    }),
    response: {
      201: _course
    }
  }
}


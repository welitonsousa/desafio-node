import { courseRoutes } from './modules/courses/course-routes.ts';
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { userRoutes } from './modules/user/user-routes.ts';
import { authRoutes } from './modules/auth/auth-routes.ts';
import { ENV } from './constants/env.ts';
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger';
import scalarAPIReference from '@scalar/fastify-api-reference'
import z from 'zod';


z.config(z.locales.pt());

export const app = fastify({
  logger: ENV.ENV == 'development' ? { transport: { target: 'pino-pretty' } } : false
}).withTypeProvider<ZodTypeProvider>();

app.register(fastifySwagger, {
  transform: jsonSchemaTransform,
  openapi: {
    info: {
      title: 'Courses API',
      version: '1.0.0'
    },
  },
})
app.register(scalarAPIReference, {
  routePrefix: '/docs',
  configuration: { theme: 'kepler' }
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

/* ============ ROUTES ============== */
app.get('/', () => 'Hello world')
app.register(authRoutes)
app.register(userRoutes)
app.register(courseRoutes)


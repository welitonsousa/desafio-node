import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger';
import { courseRoutes } from './modules/courses/course-routes.ts';
import scalarAPIReference from '@scalar/fastify-api-reference'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'



export const app = fastify({
  logger: { transport: { target: 'pino-pretty' } }
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
app.register(courseRoutes)


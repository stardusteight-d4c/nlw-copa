import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './routes'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })
  fastify.register(cors, {
    origin: true,
  })
  fastify.register(appRoutes)

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()

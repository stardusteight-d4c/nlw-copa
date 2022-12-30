import { FastifyInstance } from 'fastify'
import { AppController } from './controllers/app-controller'

const appController = new AppController()

async function appRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', appController.countPools)
  fastify.get('/users/count', appController.countUsers)
  fastify.get('/guesses/count', appController.countGuesses)
  fastify.post('/pools', appController.createPool)
}

export { appRoutes }

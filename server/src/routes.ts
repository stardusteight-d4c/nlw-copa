import { FastifyInstance } from 'fastify'
import { AppController } from './controllers/app-controller'

const appController = new AppController()

async function appRoutes(fastify: FastifyInstance) {
  fastify.post('/createUser', appController.createUser)
  fastify.post('/createPool', appController.createPool)
  fastify.get('/usersPools/:userId', appController.userPools)
  fastify.get('/searchPoolByCode', appController.searchPoolByCode)
  fastify.get('/pools/count', appController.countPools)
  fastify.get('/users/count', appController.countUsers)
  fastify.get('/guesses/count', appController.countGuesses)
}

export { appRoutes }

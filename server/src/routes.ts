import { FastifyInstance } from 'fastify'
import { AppController } from './controllers/app-controller'

const appController = new AppController()

async function appRoutes(fastify: FastifyInstance) {
  fastify.post('/createUser', appController.createUser)
  fastify.post('/createPool', appController.createPool)
  fastify.post('/createGuess', appController.createGuess)
  fastify.post('/setWinningGuess', appController.setWinningGuess)
  fastify.get('/usersPools/:userId', appController.userPools)
  fastify.get('/poolByCode', appController.poolByCode)
  fastify.get('/guessesByPoolId', appController.guessesByPoolId)
  fastify.get('/guessesByUserId', appController.guessesByUserId)
  fastify.get('/participants', appController.participants)
  fastify.get('/userById', appController.getUserById)
  fastify.get('/pools/count', appController.countPools)
  fastify.get('/users/count', appController.countUsers)
  fastify.get('/guesses/count', appController.countGuesses)
}

export { appRoutes }

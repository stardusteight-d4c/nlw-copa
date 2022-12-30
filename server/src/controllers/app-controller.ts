import { PrismaClient } from '@prisma/client'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'

const prisma = new PrismaClient({
  log: ['query'],
})

export class AppController {
  async countPools() {
    const count = await prisma.pool.count()
    return { count }
  }

  async countUsers() {
    const count = await prisma.user.count()
    return { count }
  }

  async countGuesses() {
    const count = await prisma.guess.count()
    return { count }
  }

  async createPool(request: FastifyRequest, reply: FastifyReply) {
    // If title is not of type string in the request, zod already triggers an error
    const createPoolBody = z.object({
      title: z.string(),
    })
    const { title } = createPoolBody.parse(request.body)
    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()

    // await prisma.pool.create({
    //   data: {
    //     title,
    //     code,
    //   },
    // })
    return reply.status(201).send({ code })
  }
}

import { PrismaClient } from '@prisma/client'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'
import { CreatePoolRequest, CreateUserRequest, UserPoolsRequest } from '../dtos'

const prisma = new PrismaClient({
  log: ['query'],
})

export class AppController {
  async createUser(
    request: FastifyRequest<{ Body: CreateUserRequest }>,
    reply: FastifyReply
  ) {
    // If title is not of type string in the request, zod already triggers an error
    const createCreateUserBody = z.object({
      name: z
        .string({
          required_error: 'Name is required',
        })
        .min(2),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email('Not a valid email'),
      avatarUrl: z.string(),
    })
    const { name, email, avatarUrl } = createCreateUserBody.parse(request.body)

    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      return reply.status(201).send({ user: userAlreadyExists })
    } else {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          avatarUrl,
        },
      })

      return reply.status(201).send({ user })
    }
  }

  async countUsers() {
    const count = await prisma.user.count()
    return { count }
  }

  async createPool(
    request: FastifyRequest<{ Body: CreatePoolRequest }>,
    reply: FastifyReply
  ) {
    const createPoolBody = z.object({
      title: z.string({
        required_error: 'title is required',
      }),
      ownerId: z.string({
        required_error: 'ownerId is required',
      }),
    })
    const { title, ownerId } = createPoolBody.parse(request.body)
    const generate = new ShortUniqueId({ length: 6 })
    const code = String(generate()).toUpperCase()

    await prisma.pool.create({
      data: {
        title,
        ownerId,
        code,
      },
    })
    return reply.status(201).send({ code })
  }

  async userPools(
    request: FastifyRequest<{ Params: UserPoolsRequest }>,
    reply: FastifyReply
  ) {
    const userId = request.params.userId

    console.log(userId)

    const pools = await prisma.pool.findMany({
      take: 20,
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    return reply.status(200).send({ pools })
  }

  async searchPoolByCode(
    request: FastifyRequest<{ Querystring: { code: string } }>,
    reply: FastifyReply
  ) {
    const code = request.query.code

    const pool = await prisma.pool.findUnique({
      where: {
        code,
      },
    })

    console.log(pool)
    if (pool) {
      return reply.status(200).send({ pool })
    } else {
      return reply.status(200).send([{}])
    }
  }

  async countPools() {
    const count = await prisma.pool.count()
    return { count }
  }

  async countGuesses() {
    const count = await prisma.guess.count()
    return { count }
  }
}

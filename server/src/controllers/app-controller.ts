import { PrismaClient } from '@prisma/client'
import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'
import ShortUniqueId from 'short-unique-id'
import { z } from 'zod'
import {
  CreateGuess,
  CreateGuessParser,
  CreatePoolRequest,
  CreateUserRequest,
  GuessesByPool,
  SetWinningGuess,
  UserPoolsRequest,
} from '../dtos'
import { TriggersError } from '../utils/TriggersError'

const prisma = new PrismaClient()

export class AppController {
  async createUser(
    request: FastifyRequest<{ Body: CreateUserRequest }>,
    reply: FastifyReply
  ) {
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
    try {
      const { name, email, avatarUrl } = createCreateUserBody.parse(
        request.body
      )
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
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async setWinningGuess(
    request: FastifyRequest<{ Body: SetWinningGuess }>,
    reply: FastifyReply
  ) {
    try {
      const { guessId, participantId } = request.body
      await prisma.participant.update({
        where: {
          id: participantId,
        },
        data: {
          points: {
            increment: 10,
          },
        },
      })
      await prisma.guess.update({
        where: {
          id: guessId,
        },
        data: {
          winner: true,
        },
      })

      return reply.status(200).send({})
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async participants(
    request: FastifyRequest<{ Querystring: { poolId: string } }>,
    reply: FastifyReply
  ) {
    const participantsQuery = z.object({
      poolId: z.string({
        required_error: 'poolId is required',
      }),
    })
    try {
      const poolId = participantsQuery.parse(request.query).poolId
      const participants = await prisma.participant.findMany({
        where: {
          poolId,
        },
        select: {
          user: true,
          points: true,
        },
        take: 4,
      })
      const count = await prisma.participant.count({
        where: {
          poolId,
        },
      })

      return reply.status(200).send({ participants, count })
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async allParticipants(
    request: FastifyRequest<{ Querystring: { poolId: string } }>,
    reply: FastifyReply
  ) {
    const allParticipantsQuery = z.object({
      poolId: z.string({
        required_error: 'poolId is required',
      }),
    })
    try {
      const poolId = allParticipantsQuery.parse(request.query).poolId
      const participants = await prisma.participant.findMany({
        where: {
          poolId,
        },
        select: {
          user: true,
          points: true,
        },
        orderBy: {
          points: 'desc',
        },
      })

      return reply.status(200).send({ participants })
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async getUserById(
    request: FastifyRequest<{ Querystring: { userId: string } }>,
    reply: FastifyReply
  ) {
    const getUserByIdQuery = z.object({
      userId: z.string({
        required_error: 'userId is required',
      }),
    })
    try {
      const userId = getUserByIdQuery.parse(request.query).userId
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      })

      return reply.status(200).send({ user })
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async createPool(
    request: FastifyRequest<{ Body: CreatePoolRequest }>,
    reply: FastifyReply
  ) {
    try {
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
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async guessesByPoolId(
    request: FastifyRequest<{ Querystring: GuessesByPool }>,
    reply: FastifyReply
  ) {
    const guessesByPoolIdQuery = z.object({
      poolId: z.string({
        required_error: 'poolId is required',
      }),
    })
    try {
      const { poolId } = guessesByPoolIdQuery.parse(request.query)

      const guesses = await prisma.participant.findMany({
        where: {
          poolId,
        },
        include: {
          guesses: true,
        },
      })

      return reply.status(200).send({ guesses })
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async guessesByUserId(
    request: FastifyRequest<{
      Querystring: { userId: string; poolId: string }
    }>,
    reply: FastifyReply
  ) {
    const guessesByUserIdQuery = z.object({
      userId: z.string({
        required_error: 'poolId is required',
      }),
      poolId: z.string({
        required_error: 'poolId is required',
      }),
    })
    try {
      const { userId, poolId } = guessesByUserIdQuery.parse(request.query)
      const guesses = await prisma.participant.findMany({
        where: {
          userId,
          poolId,
        },
        include: {
          guesses: true,
        },
      })

      return reply.status(200).send({ guesses })
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async userPools(
    request: FastifyRequest<{ Params: UserPoolsRequest }>,
    reply: FastifyReply
  ) {
    try {
      const userId = request.params.userId
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
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async poolByCode(
    request: FastifyRequest<{ Querystring: { code: string } }>,
    reply: FastifyReply
  ) {
    const poolByCodeQuery = z.object({
      code: z.string({
        required_error: 'code is required',
      }),
    })
    try {
      const code = poolByCodeQuery.parse(request.query).code
      const pool = await prisma.pool.findUnique({
        where: {
          code,
        },
        include: {
          participants: true,
          owner: true,
        },
      })

      if (pool) {
        return reply.status(200).send({ pool: [pool] })
      } else {
        return reply.status(200).send({ pool: [] })
      }
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async createGuess(
    request: FastifyRequest<{ Body: CreateGuess }>,
    reply: FastifyReply
  ) {
    const createGuessBody = CreateGuessParser()
    try {
      const { ...data } = createGuessBody.parse(request.body)
      const isAlreadyParticipating = await prisma.participant.findFirst({
        where: {
          poolId: data.poolId,
          userId: data.userId,
        },
      })
      const createParticipant = async () => {
        const participant = await prisma.participant.create({
          data: {
            poolId: data.poolId,
            userId: data.userId,
          },
        })

        return participant
      }

      const participant = isAlreadyParticipating
        ? isAlreadyParticipating
        : await createParticipant()
      const guessAlreadyExistsI = await prisma.guess.findFirst({
        where: {
          participantId: participant.id,
          firstTeamCountryCode: data.firstTeamCountryCode,
          secondTeamCountryCode: data.secondTeamCountryCode,
        },
      })
      const guessAlreadyExistsII = await prisma.guess.findFirst({
        where: {
          participantId: participant.id,
          firstTeamCountryCode: data.secondTeamCountryCode,
          secondTeamCountryCode: data.firstTeamCountryCode,
        },
      })
      if (guessAlreadyExistsI || guessAlreadyExistsII) {
        return reply.status(406).send({ status: false })
      } else {
        const guess = await prisma.guess.create({
          data: {
            firstTeamCountryCode: data.firstTeamCountryCode,
            firstTeamPoints: Number(data.firstTeamPoints),
            secondTeamCountryCode: data.secondTeamCountryCode,
            secondTeamPoints: Number(data.secondTeamPoints),
            date: data.date,
            participantId: participant.id,
          },
        })

        return reply.status(201).send({ guess: [guess] })
      }
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async countUsers(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const count = await prisma.user.count()
      return { count }
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async countPools(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const count = await prisma.pool.count()
      return { count }
    } catch (error) {
      new TriggersError(error, reply)
    }
  }

  async countGuesses(_request: FastifyRequest, reply: FastifyReply) {
    try {
      const count = await prisma.guess.count()
      return { count }
    } catch (error) {
      new TriggersError(error, reply)
    }
  }
}

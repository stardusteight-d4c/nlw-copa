# NLW Copa | Fastify with TypeScript

![banner](banner.png)

> Project made at the event `Next Level Week | Copa` held by `Rocketseat`, the purpose of this event was to build an end-to-end application
> in which people can create pools, receive a code, and so she can send her pool for friends to participate and their friends can
> send your predictions for different matches of the World Cup games. The backend of the application relies on `Fastify` to develop servers for
> web API services, `TypeScript` and `Zod` to validate, process and type data coming from requests and so that we have a more robust backend.

:arrow_right: Fastify with TypeScript <br />
:arrow_right: Zod | Data validation library <br />
:arrow_right: Data Transfer Object (DTO) <br />
:arrow_right: Server Side Rendering (SSR) <br />
:arrow_right: Monorepo <br />

<br />

## Fastify with TypeScript

Given one of the core goals of the project is `performance`, we do not land any feature if the implementation isn’t well optimized and the cost that we pay is as low as possible. Tomas Della Vedova — Lead maintainer of Fastify.

Fastify is `extremely fast`, in its benchmark tests it receives more than 31 thousand requests/second, this performance extends to core-features, one of them is `Schema based`, it has a standardization scheme of data output in your routes, fastify strongly recommends you to `standardize your responses`, using some `JSON Schema, which guarantees that your data will be delivered correctly` and you will still get 10 to 20% of performance, this is connected to the fact that internally fastify compiles the schema into a high performance function.

```ts
import Fastify from 'fastify'

const fastify = Fastify({
    logger: false,
})

const handler = (req, reply) => {
  reply.send({ hello: 'world' })
}

const route = {
  method: 'GET',
  url: '/',
    schema: {
    querystring: {
      name: { type: 'string' },
      excitement: { type: 'integer' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}

fastify.route(route, handler)

fastify.listen(3000)
```

Using the `response property`, which is part of the `schema object`, it is possible to treat http responses by code, eg: 200, 201, 202... or just generically, eg: 2xx.

```ts
const schema = {
  response: {
    '2xx': {
      type: 'object',
      properties: {
        value: { type: 'string' },
        otherValue: { type: 'boolean' }
      }
    },
    201: {
      type: 'object',
      properties: {
        value: { type: 'string' }
      }
    }
  }
}

fastify.post('/the/url', { schema }, handler)
```

In the above way, you can `exactly standardize your answers`, of course, this standardization does not eliminate tests in your application in any way. But they serve as a support and basis, `to guarantee even more the integrity of the information returned in their answers`. Even fastify has a request injection scheme, precisely to facilitate testing your application.

Fastify is a real different approach, it `provides a light and small core` that is easy to extend with plugins and mature your application based on services, `focusing on performance and low overhead`. The architecture pattern that is used to build it enables ready-made, lightweight, and robust applications for microservices.

### Typing data and handling errors and exceptions

`Fastify request objects` have four dynamic properties: body, params, query, and headers. Their respective types are assignable through this interface. It is a named property interface enabling the developer to ignore the properties they do not want to specify. All omitted properties are defaulted to `unknown`. The corresponding property names are: `Body, Querystring, Params, Headers`.

```ts
// src/dtos.ts
export interface GuessesByPool {
  poolId: string
}

// src/controllers/app-controller.ts
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

// src/utils/TriggersError.ts
export class TriggersError {
  constructor(error: any, reply: FastifyReply) {
    console.error(error)
    return reply.status(500).send({
      status: false,
      msg: error.message,
    })
  }
}
```

<br />

## Zod | Data validation library 

Zod is a library that `allows you to define rules for validating data`, Zod will automatically generate Typescript types for you, allowing you to use the received data more securely. We use Zod to validate the data that will be received on the REST server. `If ​​the data does not match the defined rules, the server will return an error indicating which field is incorrect and what was expected`.

```ts
// src/dtos.ts
export function CreateGuessParser() {
  return z.object({
    firstTeamCountryCode: z.string({
      required_error: 'firstTeamCountryCode is required',
    }),
    secondTeamCountryCode: z.string({
      required_error: 'secondTeamCountryCode is required',
    }),
    firstTeamPoints: z.string({
      required_error: 'firstTeamPoints is required',
    }),
    secondTeamPoints: z.string({
      required_error: 'secondTeamPoints is required',
    }),
    date: z.string({
      required_error: 'date is required',
    }),
    poolId: z.string({
      required_error: 'poolId is required',
    }),
    userId: z.string({
      required_error: 'userId is required',
    }),
  })
}


// src/controllers/app-controller.ts
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
```

In this backend application we use Fastify to create a REST API and we use Zod to validate the data sent by the user, so that the creation of REST APIs becomes increasingly sophisticated and robust, thinking about the integrity and coherence of the data.

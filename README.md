# NLW Copa | Fastify with TypeScript

![banner](banner.png)

> Project made at the event `Next Level Week | Copa` held by `Rocketseat`, the purpose of this event was to build an end-to-end application
> in which people can create pools, receive a code, and so she can send her pool for friends to participate and their friends can
> send your predictions for different matches of the World Cup games. The backend of the application relies on `Fastify` to develop servers for
> web API services, `TypeScript` and `Zod` to validate, process and type data coming from requests and so that we have a more robust backend.

:arrow_right: Fastify <br />
:arrow_right: Zod | Data validation library <br />
:arrow_right: Data Transfer Object (DTO) <br />
:arrow_right: Server Side Rendering (SSR) <br />
:arrow_right: Monorepo <br />

<br />

## Fastify

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

<div align="center">
  <img src="logo.png" width="222" height="78" />
</div>

<h1 align="center">
  NLW Copa, World Cup Pool
</h1>

The World Cup Betting Pools project is an online platform that allows users to create and participate in football World Cup betting pools. The project was developed using modern and advanced technologies both in the frontend and in the backend.

On the frontend, Next.js framework with TypeScript was used to create a fast and responsive user experience. The Axios library was used to handle the API calls. Vite was used as a build tool for creating a more efficient development environment. Redux was used to manage the state of the application. Authentication was performed through Firebase, with authentication via Google.

On the backend, Node.js was chosen as the development platform with the Fastify framework to handle the API requests. Zod was used for data entry validation and the Prisma library was chosen to handle the database operations. TypeScript was used to add typing to the code and make development more secure.

The combination of these technologies allowed the project to be developed efficiently and safely, with good performance and a great user experience. The platform is ideal for football fans who want to create pools or participate in pools during the World Cup.

## :hammer_and_wrench: Tools

### Frontend

* Next.js
* TypeScript
* Axios
* Vite
* Redux
* Firebase

### Backend

* Node.js
* TypeScript
* Fastify
* Zod
* Prisma

## :mailbox_with_mail: Utilities
 
### Next.js

Next.js is a web development framework for React that offers advanced server-side rendering functionality, routing, state management, API support, and much more. It was created to simplify the process of developing web applications using React, allowing developers to focus more on business logic and less on repetitive tasks.

Next.js offers several important features for developers, such as:

* Server-side rendering (SSR) and client-side rendering (CSR) to improve loading speed and indexing by search engines.
* Support dynamic and clean routes, making routing easier and friendlier for users.
* Integrated state management with React, including support for Redux and other popular libraries.
* Creation of RESTful and GraphQL APIs using the same code base as the application, facilitating communication between the frontend and backend.
* Pre-rendering of static pages to further improve performance and indexing by search engines.
* Integration with several popular tools such as TypeScript, ESLint, Prettier, Sass, among others.

Additionally, Next.js has an active community and a wealth of resources available, including detailed documentation, tutorials, videos, and code examples. It is widely used by renowned companies around the world, including Airbnb, Netflix, Uber, Twitch, among others.
 
### Firebase

Firebase is a mobile and web application development platform that provides various services such as user authentication, cloud storage, real-time database, application hosting and data analysis. The platform allows developers to build applications quickly without worrying about the underlying infrastructure.

Firebase authentication with Google is one of the most used features of Firebase. Firebase Authentication provides an easy-to-use API to authenticate users using their Google accounts. Users can sign up and sign in to your application using their Google accounts, without having to create a new username and password.

To use authentication with Google, a developer first needs to configure Firebase in the Google Cloud console and then integrate the Firebase authentication library into their application. When a user attempts to sign in using their Google account, Firebase Authentication manages the entire authentication process, including validating credentials and generating access tokens. The developer can then use these tokens to authenticate the user in other parts of the application.

Firebase authentication with Google is a convenient and secure way to let users access your app without having to worry about managing passwords or sensitive user information.

### Zod

Zod is a schema validation library for JavaScript and TypeScript. With it, you can easily and flexibly validate input data into an application, allowing you to ensure that incoming data meets the requirements of the specified schema.

The Zod library provides a series of primitive types that can be used to define validation schemes, such as string, number, boolean, object, among others. In addition, it is also possible to create custom types such as enum, array, union and tuple.

When using Zod, it is possible to define the validation scheme for each object or data value that is received by the application. For example, if a form API receives data from a user, the developer can use Zod to define types and restrictions for each form field, ensuring that the data received is valid.

In addition, Zod also provides a number of additional features such as custom error messages, asynchronous validation, automatic generation of schemas from TypeScript types, among others. These features help make the data validation process more efficient and less error-prone.

## :speech_balloon: Explanations

### Fastify with TypeScript

Given one of the core goals of the project is performance, we do not land any feature if the implementation isn’t well optimized and the cost that we pay is as low as possible. Tomas Della Vedova — Lead maintainer of Fastify.

Fastify is extremely fast, in its benchmark tests it receives more than 31 thousand requests/second, this performance extends to core-features, one of them is Schema based, it has a standardization scheme of data output in your routes, fastify strongly recommends you to standardize your responses, using some JSON Schema, which guarantees that your data will be delivered correctly and you will still get 10 to 20% of performance, this is connected to the fact that internally fastify compiles the schema into a high performance function.

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

Using the response property, which is part of the schema object, it is possible to treat http responses by code, eg: 200, 201, 202... or just generically, eg: 2xx.

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

In the above way, you can exactly standardize your answers, of course, this standardization does not eliminate tests in your application in any way. But they serve as a support and basis, to guarantee even more the integrity of the information returned in their answers. Even fastify has a request injection scheme, precisely to facilitate testing your application.

Fastify is a real different approach, it provides a light and small core that is easy to extend with plugins and mature your application based on services, focusing on performance and low overhead. The architecture pattern that is used to build it enables ready-made, lightweight, and robust applications for microservices.

#### Typing data and handling errors and exceptions

Fastify request objects have four dynamic properties: body, params, query, and headers. Their respective types are assignable through this interface. It is a named property interface enabling the developer to ignore the properties they do not want to specify. All omitted properties are defaulted to `unknown`. The corresponding property names are: <strong>Body, Querystring, Params, Headers</strong>.

```ts
// server/src/dtos.ts
export interface GuessesByPool {
  poolId: string
}

// server/src/controllers/app-controller.ts
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

// server/src/utils/TriggersError.ts
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

### Zod: Data validation library 

Zod is a library that allows you to define rules for validating data, Zod will automatically generate Typescript types for you, allowing you to use the received data more securely. We use Zod to validate the data that will be received on the REST server. If the data does not match the defined rules, the server will return an error indicating which field is incorrect and what was expected.

```ts
// server/src/dtos.ts
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


// server/src/controllers/app-controller.ts
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

<br />

### Data Transfer Objects (DTOs)

Data Transfer Objects (DTOs) are objects that encapsulate data that is transferred between different parts of a software system. They serve as a standard for exchanging information between different components of a distributed system, such as the front end and the back end.

The main reason for using DTOs is separation of concerns. They allow application layers to focus on their own specific tasks without worrying about the internal structure of the data being passed to other layers. For example, in a web application, a DTO can be used to transfer data from an HTML page to the back-end server.

Furthermore, DTOs also allow the developer to better control what data is transferred and in what format. This is especially important in distributed systems, where different parts of the system may be using different technologies and need a consistent way to exchange information.

In general, DTOs should be simple and lightweight, containing only the data needed to be transferred. They should also be immutable and serializable so they can be easily transmitted in different formats like JSON or XML.

In summary, DTOs are a useful technique for transferring data between different layers of a distributed software system, helping to separate concerns and ensure consistency of transferred data.

The following code is an example of DTO (Data Transfer Object), as it defines an object that is used to transfer data between different layers of an application. In this case, the CreateUserRequest object is used to transfer data necessary to create a user in an application, such as name, email and avatar URL. This data is encapsulated in an object to facilitate its transfer between different layers, such as between the presentation layer and the data persistence layer.

```ts
// server/src/dtos.ts

export interface CreateUserRequest {
  name: string
  email: string
  avatarUrl: string
}
```

* <strong>Data Mapper Pattern</strong>

DTOs (Data Transfer Objects) and the Data Mapper Pattern are distinct concepts, but frequently used together in applications that follow the principle of separation of responsibilities.

The Data Mapper Pattern is a design pattern that consists of separating the persistence logic from the application's business objects. In other words, the Data Mapper is responsible for mapping the properties of business objects to database columns and vice versa, isolating this responsibility from the rest of the application.

DTOs are objects that serve to transfer data between different layers of the application, such as the persistence layer and the presentation layer. They encapsulate the data that will be transferred, making the process of transferring that data easier and safer.

In this way, DTOs can be used in conjunction with the Data Mapper Pattern to facilitate data transfer between application layers, allowing the Data Mapper to focus only on the persistence of business objects and not have to worry about the transfer of data.

<br />

### Server Side Rendering (SSR) 

Server-Side Rendering (SSR) is a technique used to generate the HTML content of a web page on the server before sending it to the user's browser. This differs from traditional Client-Side Rendering (CSR), where HTML content is generated in the user's browser, usually using JavaScript.

SSR allows the page to be preloaded with HTML, CSS, and JavaScript content, reducing load times and improving the user experience. Furthermore, SSR is also beneficial for search engine indexing, as the content can be crawled by the search engine before being processed by the browser.

Next.js is a popular library for building web apps in React that supports SSR. With Next.js, you can create pages that are pre-rendered on the server and also rendered on the client side when needed. Next.js uses the concept of dynamic routes to generate SSR pages, where each route is mapped to a React component that is rendered on the server and sent to the user's browser.

In SSR, the server can be responsible for getting data from external APIs, databases or any other resource that can be used in rendering the page. This allows the page to load with real, personalized, and updated content rather than static content.

#### SSR with Next.js

If a page uses Server-side Rendering, the page HTML is generated on each request.

To use Server-side Rendering for a page, you need to export an async function called getServerSideProps. This function will be called by the server on every request.

For example, suppose that your page needs to pre-render frequently updated data (fetched from an external API). You can write getServerSideProps which fetches this data and passes it to component like below:

```tsx
// web/src/pages/index.tsx
export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('pools/count'),
      api.get('guesses/count'),
      api.get('users/count'),
    ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  }
}

export default function Home(props: Props) {}

// web/src/pages/pool/[code].tsx
export const getServerSideProps = async (context: any) => {
  const pool = await api
    .get(poolByCode, {
      params: {
        code: context.params.code,
      },
    })
    .then(({ data }) => data)
    .catch((error) => console.log(error.toJSON()))

  return {
    props: {
      ...pool,
    },
  }
}

export default function PoolCode({ pool }: Props) {}
```

If you export a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.

<p align="center">Project made with :blue_heart: by <a href="https://github.com/stardusteight-d4c">Gabriel Sena</a></p>


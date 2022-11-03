import Fastify from "fastify"
import cors from "@fastify/cors"
import { z } from "zod"
import ShortUniqueId from "short-unique-id"
import { PrismaClient} from "@prisma/client"

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap(){
  const fastify = Fastify({
    logger: true,
  })
  
  await fastify.register(cors, {
    origin: true,
  })

  //contagem de apostas
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })
//contagem de usuários
  fastify.get('/user/count', async () => {
    const count = await prisma.user.count()

    return { count }
  })

  //contagem de palpites
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()

    return { count }
  })
  fastify.post('/pools', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    })
    const { title } = createPoolBody.parse(request.body)
    
    const generate = new ShortUniqueId({length: 6}) //gera o codigo da tabela
    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code 
      }
    })

    return reply.status(201).send({ code })
  })

  await fastify.listen({port: 3333, /* host: '0.0.0.0' */})
}

bootstrap();
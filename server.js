// import {createServer } from 'node:http'

// const server = createServer((request, response) => {
//   response.write("Oilá")

//   return response.end()
// })

// server.listen(3333)

// request -> obter dados da requisição que o usuário está fazendo para o servidor http
// traz informações da requisição que está sendo feita para dentro da api

// response -> é um objeto utilizado para devolver uma resposta para quem está chamando a api

import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'

// variável que inicializa o servidor
const server = fastify()

// variável que armazena os métodos para fazer CRUD
// const database = new DatabaseMemory()

// variável que armazena os métodos para fazer CRUD
const database = new DatabasePostgres

/* POST -> rota para criar um novo vídeo */

server.post('/videos', async (request, reply) => {
  // variável que envia um corpo na requisição -> método chamado de request body
  const { title, description, duration } = request.body

  // chamando o método create para criar um novo vídeo dentro desta rota
  await database.create({
    title,
    description,
    duration,
  })

  // status code 201 -> significa que algo foi criado
  return reply.status(201).send()
})

/* GET -> rota para listagem de vídeos */

server.get('/videos', async (request) => {
  const search = request.query.search

  console.log(search);
  // variável chamando o método list para listar os vídeos existentes/criados
  const videos = await database.list(search)

  // retornar um objeto com a listagem de vídeos existentes/criados
  return videos
})

/* PUT -> rota para atualizar um único vídeo */

// parâmetro id utilizado na rota -> chamado de route parameter -> é um identificador para que cada vídeo seja único
server.put('/videos/:id', async (request, reply) => {
  // variável para acessar todos os parâmetros dentro da rota
  const videoId = request.params.id
  // variável que envia um corpo na requisição -> método chamado de request body
  const { title, description, duration } = request.body

  // variável utilizando o método update para atualizar o vídeo, passando como parâmetro o id do vídeo a ser atualizado
  await database.update(videoId, {
    title,
    description,
    duration,
  })

  // status code 204 -> significa que a requisição obteve sucesso, mas ela não possui resposta, é vazio
  return reply.status(204).send()

})

/* DELETE -> rota para deletar um vídeo */

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})

// servidor fastify -> basicamente separa a aplicação em vários endereços/rotas de acordo com o que o usuário estiver acessando

// CRUD -> create, read, update, delete

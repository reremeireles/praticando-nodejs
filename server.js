
// servidor fastify -> basicamente separa a aplicação em vários endereços/rotas de acordo com o que o usuário estiver acessando
import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'


// variável que inicializa o servidor
const server = fastify()

// variável que armazena os métodos para fazer CRUD através do banco de dados local
// const database = new DatabaseMemory()

// variável que armazena os métodos para fazer CRUD através do Postgres
const database = new DatabasePostgres

/* POST -> rota para criar um novo vídeo na rota /videos */

server.post('/videos', async (request, reply) => {
  // variável que envia um corpo na requisição -> método chamado de request body
  const { title, description, duration } = request.body

  // a variável database chama o método create para criar um novo vídeo dentro da rota /videos
  await database.create({
    title,
    description,
    duration,
  })

  // retornar o status code 201 -> significa que o vídeo foi criado com sucesso
  return reply.status(201).send()
})

/* GET -> rota para listagem de vídeos na rota /videos */

server.get('/videos', async (request) => {
  const search = request.query.search

  console.log(search);
  // variável chamando o método list para listar os vídeos existentes/criados
  // o parâmetro search é chamado quando há uma busca específica na listagem
  const videos = await database.list(search)

  // retornar um objeto com a listagem de vídeos existentes/criados
  return videos
})

/* PUT -> rota para atualizar um único vídeo */

// o parâmetro id é utilizado na rota como um identificador -> é chamado de route parameter
// é um identificador para que cada vídeo seja único
server.put('/videos/:id', async (request, reply) => {
  // variável para acessar o parâmetro id dentro da rota
  const videoId = request.params.id
  // variável que envia um corpo na requisição -> método chamado de request body
  const { title, description, duration } = request.body

  // variável database chama o método update para atualizar o vídeo, passando como parâmetro o id do vídeo a ser atualizado
  await database.update(videoId, {
    title,
    description,
    duration,
  })

  // retornar status code 204 -> significa que a requisição obteve sucesso, mas ela não possui resposta/corpo, é vazia
  return reply.status(204).send()
})

/* DELETE -> rota para deletar um vídeo */

server.delete('/videos/:id', async (request, reply) => {
  // variável para acessar o parâmetro id dentro da rota
  const videoId = request.params.id

  // a variável databse chama o método delete passando como parâmetro o id do vídeo a ser deletado
  await database.delete(videoId)

  // retornar status code 204 -> significa que a requisição obteve sucesso, mas ela não possui resposta/corpo, é vazia
  return reply.status(204).send()
})

// porta que fica ouvindo as requisições
// ambiente dev -> porta 3333
// ambiente de produção (deploy da aplicação) -> utilizar a prop host e a variável ambiente process.env.PORT
server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})


// CRUD -> create, read, update, delete

/* MANEIRA MAIS BÁSICA DE CRIAR UM SERVIDOR

import {createServer } from 'node:http'

const server = createServer((request, response) => {
  response.write("Oilá")

  return response.end()
})

server.listen(3333)

request -> obter dados da requisição que o usuário está fazendo para o servidor http
traz informações da requisição que está sendo feita para dentro da api

response -> é um objeto utilizado para devolver uma resposta para quem está chamando a api
*/

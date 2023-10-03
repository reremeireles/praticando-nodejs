import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres {

  // método para listar os vídeos
  async list(search) {
    let videos

    // verificação assíncrona para fazer busca no banco de dados
    // as operações assíncronas levam um tempo para completarem a tarefa
    if (search) {
      videos = await sql`select * from videos where title ilike ${'%' + search + '$'}`
    } else {
      videos = await sql`select * from videos`
    }

    return videos
  }

  //método para criar um novo vídeo (precisa tanto do id quanto do vídeo referência)
  async create(video) {
    const videoId = randomUUID()

    const {title, description, duration} = video

    await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
  }

  // método para atualizar um vídeo (precisa tanto do id quanto do vídeo referência)
  async update(id, video) {
    const { title, description, duration } = video

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
  }

  // método para deletar um vídeo (só precisa do id do vídeo)
  async delete(id) {
    await sql`delete from videos where id = ${id}`
  }
}

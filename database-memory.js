import { randomUUID } from "node:crypto"

export class DatabaseMemory {
  #videos = new Map()

  // método para listar os vídeos
  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
      const id = videoArray[0]
      const data = videoArray[1]

      return {
        id,
        ...data,
      }
      })
      // método para retornar um resultado de busca filtrado pelo título
      // includes retorna um valor boolean
      .filter(video => {
        if (search) {
        return video.title.includes(search)
        }
        // caso não haja busca, retornar true -> significa que vai retornar todos os vídeos da listagem
        return true
    })
  }

  //método para criar um novo vídeo (precisa tanto do id quanto do vídeo referência)
  create(video) {
    // variável que inicializa o método randomUUID e retorna um id único e aleatório
    const videoId = randomUUID() // UUID -> universally unique identifier (identificador único universal)

    this.#videos.set(videoId, video)
  }

  // método para atualizar um vídeo (precisa tanto do id quanto do vídeo referência)
  update(id, video) {
    this.#videos.set(id, video)
  }

  // método para deletar um vídeo (só precisa do id do vídeo)
  delete(id) {
    this.#videos.delete(id)
  }
}

import { DatabasePostgres } from './database-postgres.js'

const db = new DatabasePostgres();
const video = {
  title: 'teste',
  description: 'teste',
  duration: 500,
}

db.create(video)

import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

// only set to true in dev mode
const synchronize = process.env.NODE_ENV === 'development'

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize,
  logging: ['error', 'warn'],
  entities: ['dist/src/entities/*.js'],
  migrations: ['dist/src/migrations/*.js'],
})

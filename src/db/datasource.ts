import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: ['error', 'warn'],
  entities: ['dist/entity/*.js'],
  migrations: ['src/migrations/*.ts'],
})

import express, { Express, Request, Response } from 'express'
import { initializeDatabase } from './src/db/dbInitializer'

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('hello from express TS')
})

initializeDatabase()

app.listen(port, () => {
  console.log(`listening on port ${port} `)
})

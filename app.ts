import express, { Express, Request, Response } from 'express'
import 'reflect-metadata'
import compression from 'compression'

import { initializeDatabase } from './src/db/dbInitializer'
import authRoutes from './src/routes/authentication.route'
import sportsRoutes from './src/routes/sports.route'

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

app.use(compression())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('hello from express TS')
})

app.use('/auth', authRoutes)
app.use('/sports', sportsRoutes)

initializeDatabase()

app.listen(port, () => {
  console.log(`listening on port ${port} `)
})

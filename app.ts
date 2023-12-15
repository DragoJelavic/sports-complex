import express, { Express, Request, Response } from 'express'
import 'reflect-metadata'
import compression from 'compression'
import * as path from 'path'

import { initializeDatabase } from './src/db/dbInitializer'
import authRoutes from './src/routes/authentication.route'
import sportsRoutes from './src/routes/sports.route'
import ageGroupRoutes from './src/routes/ageGroups.route'
import sportClassesRoute from './src/routes/sportClasses.route'
import userRoute from './src/routes/users.route'

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../public/views'))
app.use(compression())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('hello from express TS')
})

app.use('/auth', authRoutes)
app.use('/sports', sportsRoutes)
app.use('/age-group', ageGroupRoutes)
app.use('/sport-classes', sportClassesRoute)
app.use('/user', userRoute)

initializeDatabase()

app.listen(port, () => {
  console.log(`listening on port ${port} `)
})

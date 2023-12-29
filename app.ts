import express, { Express, Request, Response } from 'express'
import 'reflect-metadata'
import compression from 'compression'
import * as path from 'path'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './src/swagger/swaggerConfig'

import { initializeDatabase } from './src/db/dbInitializer'
import authRoutes from './src/routes/authentication.route'
import sportsRoutes from './src/routes/sports.route'
import ageGroupRoutes from './src/routes/ageGroups.route'
import sportClassesRoute from './src/routes/sportClasses.route'
import userRoute from './src/routes/users.route'
import commentsRoute from './src/routes/comments.route'
import { Server } from 'http'

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../public/views'))
app.use(compression())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use('/auth', authRoutes)
app.use('/sports', sportsRoutes)
app.use('/age-groups', ageGroupRoutes)
app.use('/sport-classes', sportClassesRoute)
app.use('/users', userRoute)
app.use('/comments', commentsRoute)

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Hello from Sport complex app')
})

export const startServer = async (): Promise<Server> => {
  await initializeDatabase()
  const server = app.listen(port, () => {
    console.log(`listening on port ${port} `)
  })

  return server
}

// Check if this file is being run directly
if (require.main === module) {
  startServer()
    .then(() => {
      console.log('Server started successfully')
    })
    .catch((error) => {
      console.error('Error starting the server:', error)
    })
}

export default app

import express, { Express, Request, Response } from 'express'
import 'reflect-metadata'
import compression from 'compression'
import * as path from 'path'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './src/swagger/swaggerConfig'

import routeManager from './src/routes/routeManager'
import { startServer } from './server'

const app: Express = express()
const port: number = Number(process.env.PORT) || 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../public/views'))
app.use(compression())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))

app.use('/auth', routeManager.authRoutes)
app.use('/sports', routeManager.sportsRoutes)
app.use('/age-groups', routeManager.ageGroupRoutes)
app.use('/sport-classes', routeManager.sportClassesRoute)
app.use('/users', routeManager.userRoute)
app.use('/comments', routeManager.commentsRoute)

app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('Hello from Sport complex app')
})

if (require.main === module) {
  startServer(app, port)
    .then(() => {
      console.log('Server started successfully')
    })
    .catch((error) => {
      console.error('Error starting the server:', error)
    })
}

export default app

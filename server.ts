import { Server } from 'http'
import { initializeDatabase } from './src/db/dbInitializer'
import { datasource } from './src/db/datasource'
import { Express } from 'express'

export const startServer = async (
  app: Express,
  port: number,
): Promise<Server> => {
  await initializeDatabase()
  const server = app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(`listening on port ${port} `)
    }
  })

  server.on('close', async () => {
    await datasource.destroy()
  })

  return server
}

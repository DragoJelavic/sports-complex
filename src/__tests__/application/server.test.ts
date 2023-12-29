import supertest from 'supertest'
import { startServer } from '../../../server'
import { Server } from 'http'
import app from '../../../app' // Import your Express app here

describe('Server Setup', () => {
  let server: Server

  beforeAll(async () => {
    const port: number = Number(process.env.PORT) || 3000
    server = await startServer(app, port) // Pass 'app' and 'port' to startServer
    // Add a small delay (e.g., 1000 milliseconds) to ensure server initialization
    await new Promise((resolve) => setTimeout(resolve, 1000))
  })

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve))
    }
  })

  it('should listen on the specified port', async () => {
    const port = process.env.PORT || 3000
    const response = await supertest(`http://localhost:${port}`).get('/')
    expect(response.status).toBe(200)
  })
})

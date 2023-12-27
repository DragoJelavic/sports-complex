import { datasource } from '../../db/datasource'
import { initializeDatabase } from '../../db/dbInitializer'

describe('Database Connection', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  it('should connect to the database successfully', async () => {
    try {
      const isConnected = await datasource.query('SELECT 1')
      expect(isConnected).toBeTruthy()
    } catch (error) {
      throw new Error('Failed to connect to the database')
    }
  })

  afterAll(async () => {
    // Close the database connection after all tests are done
    await datasource.destroy()
  })
})

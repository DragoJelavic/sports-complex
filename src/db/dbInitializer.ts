import { datasource } from './datasource'

export async function initializeDatabase(): Promise<void> {
  try {
    await datasource.initialize()
    if (process.env.NODE_ENV !== 'test') {
      console.log('db initialized')
    }
  } catch (error) {
    console.log('error during db initialization', error)
  }
}

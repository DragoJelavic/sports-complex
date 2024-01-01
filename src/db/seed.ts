import { datasource } from './datasource'
import { AgeGroup, Sport, User } from '../entities'
import { UserRole } from '../enums/UserRole'

const seedDatabase = async () => {
  try {
    await datasource.initialize() // Ensure the database is initialized

    console.log('Database initialized. Seeding data...')

    // Seed Age Groups
    const ageGroupsData = ['Youth', 'Veteran', 'Senior', 'Under 13']
    await Promise.all(
      ageGroupsData.map(async (groupName) => {
        const ageGroup = new AgeGroup()
        ageGroup.name = groupName
        await datasource.manager.save(ageGroup)
      }),
    )

    console.log('Age Groups seeded successfully.')

    // Seed Sports
    const sportsData = ['Football', 'Basketball', 'Tennis', 'Swimming']
    await Promise.all(
      sportsData.map(async (sportName) => {
        const sport = new Sport()
        sport.name = sportName.toUpperCase()
        await datasource.manager.save(sport)
      }),
    )

    console.log('Sports seeded successfully.')

    // Seed Users
    const usersData = [
      {
        email: 'user1@example.com',
        password: 'Password1',
        role: UserRole.USER,
      },
      {
        email: 'user2@example.com',
        password: 'Password2',
        role: UserRole.USER,
      },
      {
        email: 'admin@example.com',
        password: 'AdminPass',
        role: UserRole.ADMIN,
      },
    ]
    await Promise.all(
      usersData.map(async (userData) => {
        const user = new User()
        user.email = userData.email
        user.password = userData.password
        user.role = userData.role
        await datasource.manager.save(user)
      }),
    )

    console.log('Users seeded successfully.')

    await datasource.destroy()
    console.log('Seed data inserted successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)

    const isConnected = await datasource.query('SELECT 1')
    if (isConnected) await datasource.destroy()
  }
}

seedDatabase()

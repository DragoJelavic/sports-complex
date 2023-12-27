import UsersService from '../../../services/users.service'
import { UserRepository } from '../../../repositories'

jest.mock('../../../repositories/users.repository')

describe('User service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          email: 'drago.jelavic@gmail.com',
          password: '123hddhdhdhd',
          role: 'admin',
        },
        {
          email: 'ante.matic@gmail.com',
          password: '123hddhdhdhd',
          role: 'user',
        },
      ]
      ;(UserRepository.find as jest.Mock).mockResolvedValue(mockUsers)

      const result = await UsersService.getUsers()

      expect(result).toEqual([mockUsers[0], mockUsers[1]])
    })

    it('should throw an error if no users are found', async () => {
      ;(UserRepository.find as jest.Mock).mockResolvedValue([])

      await expect(UsersService.getUsers()).rejects.toThrow(
        new Error('Users not found'),
      )
    })
  })
})

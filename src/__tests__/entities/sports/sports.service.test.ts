import SportsService from '../../../services/sports.service'
import { SportsRepository } from '../../../repositories'

jest.mock('../../../repositories/sports.repository')

describe('SportsService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getSports', () => {
    it('should return an array of sports', async () => {
      const mockSports = [{ name: 'Football' }, { name: 'Tennis' }]
      ;(SportsRepository.find as jest.Mock).mockResolvedValue(mockSports)

      const result = await SportsService.getSports()

      expect(result).toEqual(['Football', 'Tennis'])
    })

    it('should throw an error if no sports are found', async () => {
      ;(SportsRepository.find as jest.Mock).mockResolvedValue([])

      await expect(SportsService.getSports()).rejects.toThrow(
        new Error('Sports not found'),
      )
    })
  })

  describe('createSport', () => {
    it('should create a new sport', async () => {
      const newSportName = 'Basketball'
      ;(SportsRepository.findByName as jest.Mock).mockResolvedValue(null)
      ;(SportsRepository.create as jest.Mock).mockResolvedValue({
        name: newSportName,
      })
      ;(SportsRepository.save as jest.Mock).mockResolvedValue(undefined)

      const result = await SportsService.createSport(newSportName)

      expect(result).toBe(`Sport ${newSportName} created`)
    })

    it('should throw an error if the sport name already exists', async () => {
      const existingSportName = 'Football'
      ;(SportsRepository.findByName as jest.Mock).mockResolvedValue({
        name: existingSportName,
      })

      await expect(
        SportsService.createSport(existingSportName),
      ).rejects.toThrow(new Error('Sport with that name already exists'))
    })
  })

  describe('updateSport', () => {
    it('should update the name of an existing sport', async () => {
      const sportId = 1
      const updatedSportName = 'Volleyball'
      ;(SportsRepository.findOne as jest.Mock).mockResolvedValue({
        id: sportId,
      })
      ;(SportsRepository.findByName as jest.Mock).mockResolvedValue(null)
      ;(SportsRepository.save as jest.Mock).mockResolvedValue(undefined)

      const result = await SportsService.updateSport(sportId, updatedSportName)

      expect(result).toBe('Sport name updated')
    })

    it('should throw an error if the sport to update is not found', async () => {
      const nonExistingSportId = 999
      ;(SportsRepository.findOne as jest.Mock).mockResolvedValue(null)

      await expect(
        SportsService.updateSport(nonExistingSportId, 'Some Name'),
      ).rejects.toThrow(new Error('There is no sport with provided ID'))
    })
  })
})

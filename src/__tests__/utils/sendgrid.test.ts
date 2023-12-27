import { sendVerificationEmail } from '../../utils/sendgrid'
import sgMail from '@sendgrid/mail'
import fs from 'fs/promises'
import dotenv from 'dotenv'

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}))

describe('SendGrid Email Service', () => {
  beforeAll(() => {
    dotenv.config({ path: '.env.test' })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('sends a verification email', async () => {
    const mockEmail = 'user@example.com'
    const mockToken = 'mockToken'

    jest.spyOn(fs, 'readFile').mockResolvedValue('<html>Email content</html>')

    await sendVerificationEmail(mockEmail, mockToken)

    expect(sgMail.send).toHaveBeenCalledWith({
      to: mockEmail,
      from: process.env.SENDGRID_API_SENDER_EMAIL,
      subject: 'Verify your email',
      html: expect.any(String),
    })
  })

  it('throws an error when email sending fails', async () => {
    const mockEmail = 'user@example.com'
    const mockToken = 'mockToken'

    jest.spyOn(fs, 'readFile').mockResolvedValue('<html>Email content</html>')

    const mockedSend = sgMail.send as jest.MockedFunction<typeof sgMail.send>
    mockedSend.mockRejectedValue(new Error('Email sending failed'))

    await expect(sendVerificationEmail(mockEmail, mockToken)).rejects.toThrow()
  })

  it('throws an error when email sending fails', async () => {
    // Test throwing an error when environment variables are not set

    // Unset SendGrid API environment variables
    process.env.SENDGRID_API_KEY = undefined
    process.env.SENDGRID_API_SENDER_EMAIL = undefined

    const mockEmail = 'user@example.com'
    const mockToken = 'mockToken'

    jest.spyOn(fs, 'readFile').mockResolvedValue('<html>Email content</html>')

    // Assert that an error is thrown when trying to send an email
    await expect(sendVerificationEmail(mockEmail, mockToken)).rejects.toThrow()
  })
})

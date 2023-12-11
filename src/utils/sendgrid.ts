import sgMail from '@sendgrid/mail'
import fs from 'fs/promises'
import path from 'path'
import { AuthErrorMessages } from '../global/errors.enum'

const sendGridApiKey = process.env.SENDGRID_API_KEY
const sendGridApiSenderEmail = process.env.SENDGRID_API_SENDER_EMAIL

if (!sendGridApiKey || !sendGridApiSenderEmail) {
  throw new Error(AuthErrorMessages.SendgridAPIError)
}

sgMail.setApiKey(sendGridApiKey)

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
) => {
  const templatePath = path.join(
    __dirname,
    '../../../public/templates/emailVerification.html',
  )

  const emailTemplate = await fs.readFile(templatePath, 'utf-8')

  // harcode the verification link
  const verificationLink = `http://localhost:${process.env.PORT}/auth/verify?token=${verificationToken}`
  const htmlContent = emailTemplate
    .replace('{verificationLink}', verificationLink)
    .replace('{userEmail}', email)

  const msg = {
    to: email,
    from: sendGridApiSenderEmail,
    subject: 'Verify your email',
    html: htmlContent,
  }

  try {
    await sgMail.send(msg)
    console.log('Verification email sent')
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw new Error(AuthErrorMessages.VerificationEmailError)
  }
}

import { UserRepository } from '../repositories/user.repository'
import { UserRole } from '../enums/UserRole'
import bcrypt from 'bcrypt'
import { sendVerificationEmail } from '../utils/sendgrid'
import { v4 as uuidv4 } from 'uuid'

class AuthService {
  static async createUser(
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
  ): Promise<string> {
    const found = await UserRepository.findByEmail(email)

    if (found) {
      throw new Error('User with that email already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = uuidv4()

    const newUser = UserRepository.create({
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
      role,
    })

    try {
      await UserRepository.save(newUser)
      await sendVerificationEmail(email, verificationToken)
      return 'User created successfully, verification email sent'
    } catch (error) {
      console.error('Error sending verification email:', error)
      await UserRepository.remove(newUser)
      return 'User created successfully, but there was an issue sending the verification email'
    }
  }

  static async verifyUserByToken(token: string): Promise<string> {
    const user = await UserRepository.findByVerificationToken(token)

    if (!user) {
      throw new Error('Invalid token')
    }

    user.isVerified = true
    await UserRepository.save(user)

    return 'User verified successfully'
  }
}

export default AuthService

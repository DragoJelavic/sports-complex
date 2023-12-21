import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

import { UserRepository } from '../repositories/users.repository'
import { UserRole } from '../enums/UserRole'

import { sendVerificationEmail } from '../utils/sendgrid'
import { AuthErrorMessages } from '../global/errors.enum'
import { User } from '../entities'

class AuthService {
  private static readonly Errors = AuthErrorMessages

  static async createUser(
    email: string,
    password: string,
    role: UserRole = UserRole.USER,
  ): Promise<string> {
    const found = await UserRepository.findByEmail(email)

    if (found) {
      throw new Error(this.Errors.UserExists)
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
      return this.Errors.VerificationEmailError
    }
  }

  static async verifyUserByToken(token: string): Promise<string> {
    const user = await UserRepository.findByVerificationToken(token)

    if (!user) {
      throw new Error(this.Errors.InvalidUserToken)
    }

    if (user.isVerified) {
      throw new Error(this.Errors.UserVerified)
    }

    user.isVerified = true
    await UserRepository.save(user)

    return 'User verified successfully'
  }

  static async loginUser(email: string, password: string): Promise<string> {
    const user = await UserRepository.findByEmail(email)

    if (!user) {
      throw new Error(this.Errors.UserNotRegistered)
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      throw new Error(this.Errors.IncorrectPassword)
    }

    return await this.generateToken(user)
  }

  private static async generateToken(user: User): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET
    const jwtExpiryTime = process.env.JWT_EXPIRY_TIME || '15m'

    if (!jwtSecret) {
      throw new Error(this.Errors.JwtSecretNotSet)
    }

    return jwt.sign({ user }, jwtSecret, {
      expiresIn: jwtExpiryTime,
    })
  }
}

export default AuthService

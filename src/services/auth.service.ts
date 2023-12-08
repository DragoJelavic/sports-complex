import { UserRepository } from '../repositories/user.repository'
import { UserRole } from '../enums/UserRole'
import bcrypt from 'bcrypt'

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

    const newUser = UserRepository.create({
      email,
      password: hashedPassword,
      isVerified: false,
      role,
    })
    await UserRepository.save(newUser)

    return 'user created successfully'
  }
}

export default AuthService

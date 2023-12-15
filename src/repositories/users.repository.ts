import { datasource } from '../db/datasource'
import { User } from '../entities/User.entity'

export const UserRepository = datasource.getRepository(User).extend({
  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ where: { email } })
  },
  async findByVerificationToken(token: string): Promise<User | null> {
    return await this.findOne({ where: { verificationToken: token } })
  },
})

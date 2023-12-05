import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'
import { SportsClass } from './SportsClass'

@Entity({ name: 'user_sports_class_enrollments' })
export class UserSportsClassEnrollment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => SportsClass)
  sportsClass: SportsClass
}

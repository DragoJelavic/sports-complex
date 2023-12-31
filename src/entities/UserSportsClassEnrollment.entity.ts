import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User.entity'
import { SportsClass } from './SportsClass.entity'

@Entity({ name: 'user_sports_class_enrollments' })
export class UserSportsClassEnrollment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => SportsClass, { onDelete: 'CASCADE' })
  sportsClass: SportsClass
}

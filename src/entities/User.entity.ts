import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm'
import { UserRole } from '../enums/UserRole'

import { IsNotEmpty, IsEmail, Matches, IsEnum } from 'class-validator'
import { UserSportsClassEnrollment } from './UserSportsClassEnrollment.entity'

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Column()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message:
      'Password must be at least 6 characters long and contain at least one number',
  })
  password: string

  @Column()
  @IsEnum(UserRole)
  role: UserRole

  @Column({ type: 'varchar', nullable: true })
  verificationToken: string | null

  @Column({ default: false })
  isVerified: boolean

  @OneToMany(() => UserSportsClassEnrollment, (enrollment) => enrollment.user) // Define the relationship here
  enrollments: UserSportsClassEnrollment[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}

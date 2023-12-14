import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsNotEmpty, IsInt, Min, Max } from 'class-validator'

import { User } from './User.entity'
import { SportsClass } from './SportsClass.entity'

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => SportsClass, { onDelete: 'CASCADE' })
  sportsClass: SportsClass

  @Column()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10)
  rating: number

  @Column()
  commentText: string

  @Column()
  @IsNotEmpty()
  isAnonymous: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

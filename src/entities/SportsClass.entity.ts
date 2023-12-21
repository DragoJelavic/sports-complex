import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import {
  IsDateString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator'

import { Sport, AgeGroup, UserSportsClassEnrollment, Comment } from './'

@Entity({ name: 'sports_classes' })
export class SportsClass {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Sport, { onDelete: 'CASCADE' })
  sport: Sport

  @ManyToOne(() => AgeGroup, { onDelete: 'CASCADE' })
  ageGroup: AgeGroup

  @Column()
  @IsDateString()
  startTime: Date

  @Column()
  @IsDateString()
  endTime: Date

  @Column('varchar', { default: 'Unknown' })
  @IsNotEmpty()
  dayOfWeek: string

  @Column()
  @IsInt()
  @Min(1)
  @Max(10)
  maxCapacity: number

  @Column({ type: 'time', default: '00:00' })
  startHour: string

  @Column({ type: 'time', default: '00:00' })
  endHour: string

  @Column({ type: 'int', default: 0 })
  duration: number

  @MinLength(20)
  @MaxLength(100)
  @Column({ type: 'text', nullable: true })
  description: string

  @OneToMany(
    () => UserSportsClassEnrollment,
    (enrollment) => enrollment.sportsClass,
  )
  enrollments: UserSportsClassEnrollment[]

  @Column({ type: 'float', default: 0 })
  averageRating: number

  @OneToMany(() => Comment, (comment) => comment.sportsClass)
  comments: Comment[]
}

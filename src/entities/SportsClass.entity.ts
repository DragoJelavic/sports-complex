import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import {
  IsDateString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator'

import { Sport } from './Sport.entity'
import { AgeGroup } from './AgeGroup.entity'

@Entity({ name: 'sports_classes' })
export class SportsClass {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Sport)
  sport: Sport

  @ManyToOne(() => AgeGroup)
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
}

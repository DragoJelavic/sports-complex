import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsNotEmpty, IsDateString, IsInt, Min, Max } from 'class-validator'

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
  @IsNotEmpty()
  dayOfWeek: string

  @Column()
  @IsDateString()
  startTime: Date

  @Column()
  @IsDateString()
  endTime: Date

  @Column()
  @IsInt()
  @Min(1)
  @Max(10)
  maxCapacity: number
}

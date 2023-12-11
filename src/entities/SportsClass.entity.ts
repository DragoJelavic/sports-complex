import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsDateString, IsInt, Min, Max } from 'class-validator'

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

  @Column()
  @IsInt()
  @Min(1)
  @Max(10)
  maxCapacity: number
}

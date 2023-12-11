import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'age_groups' })
@Unique(['name'])
export class AgeGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  name: string
}

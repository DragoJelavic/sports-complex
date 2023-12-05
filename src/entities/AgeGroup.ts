import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'age_groups' })
export class AgeGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  name: string
}

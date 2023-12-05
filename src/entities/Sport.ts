import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsNotEmpty } from 'class-validator'

@Entity({ name: 'sports' })
export class Sport {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  name: string
}

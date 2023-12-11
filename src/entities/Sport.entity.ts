import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm'
import { IsNotEmpty, IsUppercase } from 'class-validator'

@Entity({ name: 'sports' })
@Unique(['name'])
export class Sport {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  @IsUppercase()
  name: string
}

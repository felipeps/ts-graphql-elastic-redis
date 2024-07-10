import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { Product } from './product.js'

@ObjectType()
@Entity()
export class User {
  @Field(type => Number)
  @PrimaryGeneratedColumn()
    id: number

  @Field(type => String)
  @Column({ type: 'varchar' })
    firstName: string

  @Field(type => String)
  @Column({ type: 'varchar', nullable: true })
    lastName: string

  @Field(type => [Product])
  @OneToMany(() => Product, (product) => product.user)
    products: Product[]
}

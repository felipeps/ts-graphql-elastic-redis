import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { User } from './user.js'
import { Category } from './category.js'

@ObjectType()
@Entity()
export class Product {
  @Field(type => Number)
  @PrimaryGeneratedColumn()
    id: number

  @Field(type => String)
  @Column({ type: 'varchar' })
    name: string

  @Field(type => String)
  @Column({ type: 'varchar' })
    detail: string

  @Field(type => Category)
  @ManyToOne((type) => Category, (category) => category.products, { nullable: true })
  @JoinTable()
    category: Category

  @Field(type => User)
  @ManyToOne((type) => User, (user) => user.products, { nullable: true })
  @JoinTable()
    user: User
}

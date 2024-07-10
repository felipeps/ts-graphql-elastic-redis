import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { Product } from './product.js'

@ObjectType()
@Entity()
export class Category {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
    id: number

  @Field(() => String)
  @Column({ type: 'varchar' })
    name: string

  @Field(type => [Product])
  @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}

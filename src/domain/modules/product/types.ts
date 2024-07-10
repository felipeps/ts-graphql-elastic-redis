import { ArgsType, Field, InputType } from 'type-graphql'
import { Product } from '../../models/product'

@InputType()
export class ProductInput implements Partial<Product> {
  @Field(type => String)
  public name: string

  @Field(type => String, { nullable: true })
  public detail: string

  @Field(type => Number)
  public userId: number

  @Field(type => Number)
  public categoryId: number
}

@InputType()
export class UpdateProductInput implements Partial<Product> {
  @Field(type => String, { nullable: true })
  public name: string

  @Field(type => String, { nullable: true })
  public detail: string

  @Field(type => Number, { nullable: true })
  public categoryId: number
}

@ArgsType()
export class ProductArgs {
  name: string = ''
  price: number = null
}

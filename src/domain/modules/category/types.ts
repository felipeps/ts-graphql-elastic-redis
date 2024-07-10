import { ArgsType, Field, InputType } from 'type-graphql'
import { Product } from '../../models/product'
import { Category } from '../../models/category'

@InputType()
export class CreateCategoryInput implements Partial<Category> {
  @Field(type => String)
  public name: string
}

@ArgsType()
export class CategoryArgs {
  name: string
}

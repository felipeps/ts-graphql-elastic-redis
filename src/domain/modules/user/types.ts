import { ArgsType, Field, InputType } from 'type-graphql'
import { User } from '../../models/user'

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field(type => String)
  public firstName: string

  @Field(type => String, { nullable: true })
  public lastName?: string
}

@ArgsType()
export class UserArgs {
  firstName: string = ''
  lastName: string = ''
}

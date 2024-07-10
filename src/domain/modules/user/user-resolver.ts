import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../../models/user.js'
import { CreateUserInput } from './types.js'
import { UserRepository } from '../../repositories/user-repository.js'

@Resolver(type => User)
export class UserResolver {
  @Mutation(returns => User)
  async createUser (@Arg('data', () => CreateUserInput) inputData: CreateUserInput): Promise<User> {
    const userRepository = UserRepository.getRepository()
    const { firstName, lastName } = inputData
    const user = userRepository.create({
      firstName,
      lastName
    })

    await userRepository.save(user)

    return user
  }

  @Query(returns => [User])
  async users (
      @Arg('firstName', () => String, { nullable: true }) firstName?: string,
      @Arg('lastName', () => String, { nullable: true }) lastName?: string): Promise<User[]> {
    const userRepository = UserRepository.getRepository()
    const users = await userRepository.find({ where: { firstName, lastName } })
    return users
  }
}

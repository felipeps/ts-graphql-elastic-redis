import { Repository } from 'typeorm'
import { User } from '../models/user.js'
import { AppDataSource } from '../../data-source.js'

export class UserRepository extends Repository<User> {
  public static getRepository (): Repository<User> {
    return AppDataSource.getRepository(User).extend(UserRepository)
  }
}

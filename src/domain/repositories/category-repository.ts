import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source.js'
import { Category } from '../models/category.js'

export class CategoryRepository extends Repository<Category> {
  public static getRepository (): Repository<Category> {
    return AppDataSource.getRepository(Category).extend(CategoryRepository)
  }
}

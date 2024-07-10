import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source.js'
import { Product } from '../models/product.js'

export class ProductRepository extends Repository<Product> {
  public static getRepository (): Repository<Product> {
    return AppDataSource.getRepository(Product).extend(ProductRepository)
  }
}

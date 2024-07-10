import crypto from 'crypto'

import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { ProductInput, UpdateProductInput } from './types.js'
import { Product } from '../../models/product.js'
import { ProductRepository } from '../../repositories/product-repository.js'
import { UserRepository } from '../../repositories/user-repository.js'
import { GraphQLError } from 'graphql'
import { Category } from '../../models/category.js'
import { CategoryRepository } from '../../repositories/category-repository.js'
import { User } from '../../models/user.js'
import { Like } from 'typeorm'
import { setIfPresent } from './helpers.js'
import { getCachedData, setCachedData } from '../middlewares/redis.js'
import { addDocument, removeDocument, updateDocument } from '../../../main/config/db/product-elasticsearch.js'

@Resolver(type => Product)
export class ProductResolver {
  @Mutation(returns => Boolean)
  async deleteProduct (@Arg('id', () => Number) id: number): Promise<boolean> {
    try {
      const productRepository = ProductRepository.getRepository()
      const product = await productRepository.findOneBy({ id })

      if (!product) {
        throw new GraphQLError('Bad Request', { extensions: { code: 'BAD_REQUEST' } })
      }

      await productRepository.delete(product.id)
      await removeDocument(`${product.id}`)

      return true
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Mutation(returns => Product)
  async updateProduct (@Arg('id', () => Number) id: number, @Arg('data', () => UpdateProductInput) inputData: UpdateProductInput): Promise<Product> {
    try {
      const productRepository = ProductRepository.getRepository()
      const { name, detail, categoryId } = inputData
      let product = await productRepository.findOneBy({ id })

      if (!product) {
        throw new GraphQLError('Bad Request', { extensions: { code: 'BAD_REQUEST' } })
      }

      let category: Category | undefined

      if (categoryId) {
        category = await CategoryRepository.getRepository().findOneBy({ id: categoryId })

        if (!category) {
          throw new GraphQLError('Bad Request', { extensions: { code: 'BAD_REQUEST' } })
        }
      }

      product = setIfPresent(product, {
        category,
        name,
        detail
      })

      await productRepository.save(product)
      await updateDocument(product)

      return product
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Mutation(returns => Product)
  async createProduct (@Arg('data', () => ProductInput) inputData: ProductInput): Promise<Product> {
    try {
      const productRepository = ProductRepository.getRepository()
      const { name, detail, userId, categoryId } = inputData
      const user = await UserRepository.getRepository().findOneBy({ id: userId })

      if (!user) {
        throw new GraphQLError('Bad Request', { extensions: { code: 'BAD_REQUEST' } })
      }

      const category = await CategoryRepository.getRepository().findOneBy({ id: categoryId })

      if (!category) {
        throw new GraphQLError('Bad Request', { extensions: { code: 'BAD_REQUEST' } })
      }

      const product = productRepository.create({
        name,
        detail,
        category,
        user
      })

      await productRepository.save(product)
      await addDocument(product)

      return product
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Query(returns => [Product])
  async products (
      @Arg('name', () => String, { nullable: true }) name?: string,
      @Arg('categoryId', () => Number, { nullable: true }) categoryId?: number,
      @Arg('detail', () => String, { nullable: true }) detail?: string): Promise<Product[]> {
    const cacheHash = crypto.createHash('md5').update(JSON.stringify({ name, categoryId, detail })).digest('hex')
    const cachedData = await getCachedData(cacheHash)

    if (cachedData) {
      return JSON.parse(cachedData) as Product[]
    }

    const productRepository = ProductRepository.getRepository()
    const products = await productRepository.find({
      where: {
        name,
        category: { id: categoryId },
        ...detail ? { detail: Like(`%${detail}%`) } : {}
      },
      relations: ['category', 'user']
    })

    await setCachedData(cacheHash, JSON.stringify(products))

    return products
  }

  @FieldResolver()
  category (@Root() product: Product): Category {
    return product.category
  }

  @FieldResolver()
  user (@Root() product: Product): User {
    return product.user
  }
}

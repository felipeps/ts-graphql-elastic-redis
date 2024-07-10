import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import { CreateCategoryInput } from './types.js'
import { Category } from '../../models/category.js'
import { CategoryRepository } from '../../repositories/category-repository.js'
import { GraphQLError } from 'graphql'

@Resolver(type => Category)
export class CategoryResolver {
  @Mutation(returns => Boolean)
  async deleteCategory (@Arg('id', () => Number) id: number): Promise<boolean> {
    const categoryRepository = CategoryRepository.getRepository()
    const category = await categoryRepository.findOneBy({ id })

    if (!category) {
      throw new GraphQLError('Bad Request', { extensions: { code: 'BAD_REQUEST' } })
    }

    await categoryRepository.delete(category.id)

    return true
  }

  @Mutation(returns => Category)
  async updateCategory (@Arg('id', () => Number) id: number, @Arg('data', () => CreateCategoryInput) inputData: CreateCategoryInput): Promise<Category> {
    const categoryRepository = CategoryRepository.getRepository()
    const category = await categoryRepository.findOneBy({ id })

    if (!category) {
      throw new GraphQLError('Bad Request', { extensions: { code: 'BAD_REQUEST' } })
    }

    const { name } = inputData

    if (name) {
      category.name = name
    }

    await categoryRepository.save(category)

    return category
  }

  @Mutation(returns => Category)
  async createCategory (@Arg('data', () => CreateCategoryInput) inputData: CreateCategoryInput): Promise<Category> {
    const categorytRepository = CategoryRepository.getRepository()
    const { name } = inputData
    const category = categorytRepository.create({
      name
    })

    await categorytRepository.save(category)

    return category
  }

  @Query(returns => [Category])
  async categories (@Arg('name', () => String, { nullable: true }) name?: string): Promise<Category[]> {
    const categoryRepository = CategoryRepository.getRepository()
    const categories = await categoryRepository.find({ where: { name } })
    return categories
  }
}

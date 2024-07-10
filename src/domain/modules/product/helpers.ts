import { Product } from '../../models/product'
import { ProductInput } from './types'

export const setIfPresent = (product: Product, input: Partial<Product>): Product => {
  if (input.name) {
    product.name = input.name
  }
  if (input.detail) {
    product.detail = input.detail
  }
  if (input.category) {
    product.category = input.category
  }

  return product
}

import 'reflect-metadata'
import { DataSource } from 'typeorm'
import env from './main/config/env.js'
import { User } from './domain/models/user.js'
import { Product } from './domain/models/product.js'
import { Category } from './domain/models/category.js'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.postgres.host,
  port: env.postgres.port,
  username: env.postgres.user,
  password: env.postgres.password,
  database: 'playvs-api',
  synchronize: true,
  logging: ['error'],
  entities: [User, Product, Category],
  migrations: [],
  subscribers: []
})

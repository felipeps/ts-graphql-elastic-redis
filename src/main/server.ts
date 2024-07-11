// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against

import express from 'express'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSchema } from 'type-graphql'

import { AppDataSource } from '../data-source.js'
import { UserResolver } from '../domain/modules/user/user-resolver.js'
import { ProductResolver } from '../domain/modules/product/product-resolver.js'
import { CategoryResolver } from '../domain/modules/category/category-resolver.js'
import { connectRedis } from './config/db/redis-connection.js'
import { ProductController } from '../domain/controllers/product-controller.js'
import { createIndex } from './config/db/product-elasticsearch.js'

import app from './config/app.js'
import env from './config/env.js'

const schema = await buildSchema({
  resolvers: [UserResolver, ProductResolver, CategoryResolver]
})

const server = new ApolloServer({
  schema
})

await AppDataSource.initialize()
await connectRedis(env.redis.uri)
await createIndex()

const { url } = await startStandaloneServer(server, {
  listen: { port: env.graphql.port }
})

console.log(`Apollo Server ready at: ${url}`)

app.use(express.json())

app.get('/elasticsearch/product/name', new ProductController().handleByName)
app.get('/elasticsearch/product/detail', new ProductController().handleByDetail)

app.listen(env.express.port, () => {
  console.log(`Express Server ready at http://localhost:${env.express.port}`)
})

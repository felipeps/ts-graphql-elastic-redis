import { Client } from '@elastic/elasticsearch'
import env from '../env.js'
import { Product } from '../../../domain/models/product.js'

const PRODUCT_INDEX = 'product_index'

const client = new Client({
  node: env.elasticsearch.node
})

export const createIndex = async () => {
  try {
    await client.indices.create({ index: PRODUCT_INDEX })
    console.log('Index created')
  } catch (err) {
    if (err.meta?.body?.error?.type === 'resource_already_exists_exception') {
      console.log('Index already created')
      return
    }
    console.log('Error creating index', err)
    throw err
  }
}

export const addDocument = async (data: Product): Promise<void> => {
  if (!data.id) {
    console.log('Document id not found')
    return
  }

  await client.index({
    index: PRODUCT_INDEX,
    id: `${data.id}`,
    document: {
      name: data.name,
      detail: data.detail
    }
  })
}

export interface MatchParams {
  id?: string
  name?: string,
  detail?: string
}

export const getDocumentsByName = async (name: string): Promise<Product[]> => {
  const match: MatchParams = {}

  if (!name) {
    throw new Error('Missing name not found')
  }

  const data = await client.search({
    index: PRODUCT_INDEX,
    query: {
      match: { name }
    }
  })

  return data.hits.hits.map((hit: any) => hit._source) as Product[]
}

export const getDocumentsByDetail = async (detail: string): Promise<Product[]> => {
  const match: MatchParams = {}

  if (!detail) {
    throw new Error('Missing detail not found')
  }

  const data = await client.search({
    index: PRODUCT_INDEX,
    query: {
      match: { detail }
    }
  })

  return data.hits.hits.map((hit: any) => hit._source) as Product[]
}

export const updateDocument = async (data: Product): Promise<void> => {
  if (!data.id) {
    console.log('Document id not found')
    return
  }

  await client.update({
    index: PRODUCT_INDEX,
    id: `${data.id}`,
    body: {
      doc: {
        name: data.name,
        detail: data.detail
      }
    }
  })
}

export const removeDocument = async (id: string): Promise<void> => {
  await client.delete({
    index: PRODUCT_INDEX,
    id
  })
}

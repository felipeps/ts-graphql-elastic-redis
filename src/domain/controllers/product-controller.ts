import { Request, Response } from 'express'
import { getDocumentsByDetail, getDocumentsByName } from '../../main/config/db/product-elasticsearch.js'
import { Product } from '../models/product.js'

export class ProductController {
  handleByName = async (req: Request, res: Response) => {
    const { q } = req.query as { q: string }

    if (!q) {
      return res.status(400).json({ error: 'Missing search query: "?q="' })
    }

    try {
      const result = await getDocumentsByName(q)
      res.json(result)
    } catch (error) {
      console.error('Search query failed:', error)
      res.status(500).json({ error: 'Search query failed' })
    }
  }

  handleByDetail = async (req: Request, res: Response) => {
    const { q } = req.query as { q: string }

    if (!q) {
      return res.status(400).json({ error: 'Missing search query: "?q="' })
    }

    try {
      const result = await getDocumentsByDetail(q)
      res.json(result)
    } catch (error) {
      console.error('Search query failed:', error)
      res.status(500).json({ error: 'Search query failed' })
    }
  }
}

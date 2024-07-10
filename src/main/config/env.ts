export default {
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password'
  },
  express: {
    port: parseInt(process.env.PORT) || 5050
  },
  graphql: {
    port: parseInt(process.env.GRAPHQL_PORT) || 4000
  },
  jwtSecret: process.env.JWT_SECRET || 'jTsmh-351!',
  redis: {
    uri: process.env.REDIS_URI || 'redis://localhost:6379'
  },
  elasticsearch: {
    node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200/'
  }
}

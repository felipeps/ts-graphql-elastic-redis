## Architecture

This project is a GraphQL API built with Apollo Server, TypeORM, Redis, Elasticsearch and Postgres.

The API has three main entities: `Product`, `Category` and `User`.

`Product` depends on `Category` and `User`.

The starting point of the API is the `src/main/server.ts` file, where the Apollo Server and the Express Server are created and the resolvers are defined.

The resolver functions are defined in the `src/domain/modules` folder.

## Stack

- [Node.js](https://nodejs.org/en/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [TypeORM](https://typeorm.io/#/)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Elasticsearch](https://www.elastic.co/)

## Setup

Install [Docker](https://docs.docker.com/compose/install/) and [Docker Compose](https://docs.docker.com/get-docker/) if you haven't already.

Edit the env vars in the `src/main/config/env.ts` file to match your environment, but it should work with the default values.

## Running
Run the following command to create and run the API, Postgres, Redis, Elasticsearch and Kibana containers:
```bash
npm run up
```
Note: The database used and created at the start up is `playvs-api`.

Elasticsearch search will be available at `http://localhost:9200` and Kibana at `http://localhost:5601`.

Elasticsearch has two endpoints available:
- `http://localhost:5050/elasticsearch/product/detail?q=` to search for products by detail
- `http://localhost:5050/elasticsearch/product/name?q=Mt` to search for products by name

The Apollo Server will be available at `http://localhost:5050`.

If you wish to run the api without the containers, you can run the following command:
```bash
npm run build
npm run start
```
Note: You will still need to run the databases in containers.

## Next Steps

Things I would do in a real scenario:

- Add tests
- Add authentication
- Add authorization
- Add Redis cache in a generic middleware
- Add Redis cache only to top entries
- Move business logic from resolvers to services
- Create interfaces to follow SOLID principles

Although this project doens't contain unit tests, I invite you to check this repository on my [GitHub](https://github.com/felipeps/clean-tdd-api). It's a project that I've built using TDD and Clean Architecture principles.
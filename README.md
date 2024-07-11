## Architecture

This project is a GraphQL API built with Apollo Server, TypeORM, Redis, Elasticsearch and Postgres.

The API has three main entities: `Product`, `Category` and `User`.

`Product` depends on `Category` and `User`.

The starting point of the API is the `src/main/server.ts` file, where the Apollo Server and the Express Server are created and the resolvers are defined.

The resolver functions are defined in the `src/domain/modules` folder.

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
# Instructions

Rating Project Backend

## Version

| Branch                                                                                                       |  Nest | Prisma                                               |  Graphql                                                              |
| ------------------------------------------------------------------------------------------------------------ | ----- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| master                                                                                                       | v7    | [prisma2](https://github.com/prisma/prisma2)         | [Code-first](https://docs.nestjs.com/graphql/quick-start#code-first)  |

## Features

- GraphQL w/ [playground](https://github.com/prisma/graphql-playground)
- Code-First w/ [decorators](https://docs.nestjs.com/graphql/quick-start#code-first)
- [Prisma](https://www.prisma.io/) for database modelling, migration and type-safe access (Postgres, MySQL & MongoDB)
- 🔐 JWT authentication w/ [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- REST API docs w/ [Swagger](https://swagger.io/)

## Overview

- [Instructions](#instructions)
  - [Features](#features)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Prisma Setup](#prisma-setup)
    - [1. Install Dependencies](#1-install-dependencies)
    - [2. Prisma: Prisma Migrate](#3-prisma-prisma-migrate)
    - [3. Prisma: Prisma Client JS](#4-prisma-client-js)
    - [4. Seed the database data with this script](#5-seed-the-database-data-with-this-script)
    - [5. Start NestJS Server](#6-start-nestjs-server)
  - [GraphQL Playground](#graphql-playground)
  - [Rest Api](#rest-api)
  - [Schema Development](#schema-development)
  - [NestJS - Api Schema](#nestjs---api-schema)
    - [Resolver](#resolver)

## Prerequisites

This software must be installed and configured before doing any of the steps down below.

### 1. Install Postgres

- Install [Postgress v13.1](https://www.postgresql.org/download/).
- Configure Postgres to default settings during installation.

### 2. Install Node

- Install [Node](https://nodejs.org/en/download/).

## Prisma Setup

### 1. Install Dependencies

1.  Install [Nestjs CLI](https://docs.nestjs.com/cli/usages) to start and [generate CRUD resources](https://trilon.io/blog/introducing-cli-generators-crud-api-in-1-minute)

    ```bash
    npm i -g @nestjs/cli
    ```

2. Install the dependencies for the Nest application:

    ```bash
    npm install
    ```

### 2. Prisma: Prisma Migrate

[Prisma Migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) is used to manage the schema and migration of the database. Prisma datasource requires an environment variable `DATABASE_URL` for the connection to the PostgreSQL database. Copy [prisma/example.env](prisma/example.env) and rename to `.env`. If you made any updates to the PostgreSQL variables (`POSTGRES_USER`, `POSTGRES_PASSWORD` `POSTGRES_DB`), please update them in your [prisma/.env](prisma/.env) file which is used by Prisma Migrate and for seeding the database.

Saving the migration of the database:

```bash
npx prisma migrate save --experimental
# or
npm run prisma:save
```

Perform the database migration:

```bash
npx prisma migrate up --experimental
# or
npm run prisma:up
```

### 3. Prisma: Prisma Client JS

[Prisma Client JS](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/api) is a type-safe database client auto-generated based on the data model.

Generate Prisma Client JS by running

> **Note**: Every time you update [schema.prisma](prisma/schema.prisma) re-generate Prisma Client JS

```bash
npx prisma generate
# or
npm run prisma:generate
```

### 4. Seed the database data with this script

Execute the script with this command:

```bash
npm run seed
```

### 5. Start NestJS Server

Run Nest Server in Development mode:

```bash
npm run start

# watch mode
npm run start:dev
```

Run Nest Server in Production mode:

```bash
npm run start:prod
```

GraphQL Playground for the NestJS Server is available here: http://localhost:3000/graphql

**[⬆ back to top](#overview)**

## GraphQL Playground

Open up the [example GraphQL queries](graphql/auth.graphql) and copy them to the GraphQL Playground. Some queries and mutations are secured by an auth guard. You have to acquire a JWT token from `signup` or `login`. Add the `accessToken`as followed to **HTTP HEADERS** in the playground and replace `YOURTOKEN` here:

```json
{
  "Authorization": "Bearer YOURTOKEN"
}
```

## Rest Api

[RESTful API](http://localhost:3000/api) documentation available with Swagger.

## Schema Development

Update the Prisma schema `prisma/schema.prisma` and after that run the following two commands:

```bash
npx prisma generate
# or in watch mode
npx prisma generate --watch
# or
npm run prisma:generate
npm run prisma:generate:watch
```

**[⬆ back to top](#overview)**

## NestJS - Api Schema

The [schema.graphql](./src/schema.graphql) is generated with [code first approach](https://docs.nestjs.com/graphql/quick-start#code-first). The schema is generated from the [models](./src/models/user.ts), the [resolvers](./src/resolvers/auth/auth.resolver.ts) and the [input](./src/resolvers/auth/dto/login.input.ts) classes.

You can use [class-validator](https://docs.nestjs.com/techniques/validation) to validate your inputs and arguments.

### Resolver

To implement the new query, a new resolver function needs to be added to `users.resolver.ts`.

```ts
@Query(returns => User)
async getUser(@Args() args): Promise<User> {
  return await this.prisma.client.user(args);
}
```

Restart the NestJS server and this time the Query to fetch a `user` should work.


**[⬆ back to top](#overview)**

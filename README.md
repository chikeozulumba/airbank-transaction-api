## Airbank Transactions API

API Service built for viewing accounts and transactions. The stack is based on  Apollo GraphQL, Node, TypeScript, Prisma, and PostgreSQL.

## Prerequisites

- Node >= 16.11
- PostgreSQL >= 11
- Yarn >= 1.22


## Geting Started

Begin by cloning this repository, running these commands:

    $ git clone https://github.com/chikeozulumba/airbank-transaction-api.git

    $ cd airbank-transaction-api

    $ yarn install

The above commands makes a copy of the repository on your machine, enters the directory and installs the required dependencies.


### Setting Up Prisma with PostgreSQL

Create a `.env` file in the root directory and supply the followng credentials:
```env
DATABASE_URL=<Your database connection string>
PORT=<Preferred port number - default 9090>
```

The Prisma CLI is expected to be already installed after running the `yarn install` command above.

### Migrating and Seeding the Database
The following commands are essential for running the migrations during the lifecycle of the project.

```env
yarn prisma migrate dev
```
The above command ensures the migrations are are executed and updated at the database level. 

```env
yarn prisma migrate reset
```
This command is used when the need to clear out the database records and refresh the schema is necessary.
Please note that this command also attempts to execute the database seeds available.

```env
yarn prisma migrate db seed
```
The above command is used in the place of running database seeds.

Prisma needs a schema definition file that accurately describes the database schema of the project. Below is the content of the configuration file for the API.

```js
//* ./prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Account {
  id   String @id @default(cuid())
  name String

  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  transactions Transaction[]

  @@map(name: "accounts")
}

model Category {
  id    String @id @default(cuid())
  name  String
  color String

  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  transactions Transaction[]

  @@map(name: "categories")
}

model Transaction {
  id         String    @id @default(cuid())
  accountId  String?
  account    Account?  @relation(fields: [accountId], references: [id])
  categoryId String?
  category   Category? @relation(fields: [categoryId], references: [id])
  reference  String?
  amount     String
  currency   String

  date DateTime

  @@map(name: "transactions")
}
```

- The *Account* model to represent accounts.
- The *Category* model to represent transaction categories.
- The *Transaction* model to represent actual transactions, having direct and inverse relationships to both the account and category tables

#### Seeding the database
To get started, you will need to download the following files and store in this path `<root>/prisma/data/`
- [accounts.csv](https://github.com/joinairbank/challenges/blob/main/dev-fullstack/data/accounts.csv)
- [categories.csv](https://github.com/joinairbank/challenges/blob/main/dev-fullstack/data/categories.csv)
- [transactions.csv](https://github.com/joinairbank/challenges/blob/main/dev-fullstack/data/transactions.csv)

These files are essential for the seeding to be completed successfully.

After the downloads and moving the files to the appropriate folder, run the following command:

```env
yarn prisma db seed
```

This populates contents of the seed files in the appropriate database tables and their fields.

You can also run:
```env
yarn prisma migrate reset
```
This resets the database records and schema and ensures that the seed command is executed.

## Running the server
After observing the above steps, you can proceed with running the development server using `yarn dev`.

## Deployment & Production build
Building the application requires the transpilation from typescript to javascript using the already installed packages i.e. `tsc`, `typescript`.

Simply run `yarn build` to generate a build copy, then run `yarn start` to start the server on any instance.

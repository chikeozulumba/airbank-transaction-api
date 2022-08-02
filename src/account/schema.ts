import { gql } from "apollo-server";

export default gql`
  scalar DateTime
  type Account {
    id: String!
    name: String!
    updatedAt: DateTime
    createdAt: DateTime
    transactions: [Transaction]
  }

  enum AccountRelation {
    transactions
    categories
  }

  type Query {
    accounts(
      take: Int
      skip: Int
      filter: String
      relations: [AccountRelation]
      transactionsSkip: Int
      transactionsTake: Int
    ): [Account!]!

    account(
      id: String
      filter: String
      relations: [AccountRelation]
      transactionsSkip: Int
      transactionsTake: Int
    ): Account!
  }
`;

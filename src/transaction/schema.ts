import { gql } from "apollo-server";

export default gql`
  scalar DateTime
  type Transaction {
    id: String!
    accountId: String
    categoryId: String
    reference: String
    amount: String!
    currency: String!
    date: DateTime!

    account: Account
    category: Category
  }

  type TransactionCount {
    count: Int!
  }

  enum TransactionRelation {
    account
    category
  }

  type Query {
    transaction(id: ID!, relations: [TransactionRelation!]): Transaction
    transactions(
      accountId: String
      categoryId: String
      take: Int
      skip: Int
      filter: String
      date: String
      startDate: String
      endDate: String
      relations: [TransactionRelation!]
    ): [Transaction!]!
    transactionsCount(accountId: String, categoryId: String): TransactionCount!
  }
`;

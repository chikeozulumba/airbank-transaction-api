import { gql } from "apollo-server";

export default gql`
  scalar DateTime
  type Category {
    id: String!
    name: String
    color: String
    createdAt: DateTime!
    updatedAt: DateTime!

    transactions: [Transaction!]
  }

  enum CategoryRelation {
    transactions
  }

  type Query {
    category(id: String, relations: [CategoryRelation!]): Category!
    categories(
      take: Int
      skip: Int
      filter: String
      relations: [CategoryRelation!]
    ): [Category]!
  }
`;

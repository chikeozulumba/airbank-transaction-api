import { ApolloServer } from "apollo-server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { GraphQLDateTime } from "graphql-iso-date";
import { AccountResolvers, AccountSchema } from "./account";
import { TransactionResolvers, TransactionSchema } from "./transaction";
import { CategoryResolvers, CategorySchema } from "./category";
import { typeDefs } from "./schema";

const port = process.env.PORT || 9090;

const server = new ApolloServer({
  resolvers: mergeResolvers([
    AccountResolvers,
    CategoryResolvers,
    TransactionResolvers,
    {
      DateTime: GraphQLDateTime,
    },
  ]),
  typeDefs: mergeTypeDefs([
    typeDefs,
    AccountSchema,
    CategorySchema,
    TransactionSchema,
  ]),
});

server.listen({ port }, () =>
  console.log(`Server runs at: http://localhost:${port}`)
);

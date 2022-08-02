import { prisma } from "../config";
import { TransactionMutation } from "./mutation";
import { TransactionQuery } from "./query";

export * from "./mutation";
export * from "./query";
export { default as TransactionSchema } from "./schema";

export const Transaction = {
  id: (parent) => parent.id,
  accountId: (parent) => parent.accountId,
  categoryId: (parent) => parent.categoryId,
  reference: (parent) => parent.reference,
  amount: (parent) => parent.amount,
  currency: (parent) => parent.currency,
  date: (parent) => parent.date,
};

export const TransactionResolvers = {
  Transaction,
  Query: TransactionQuery,
  Mutation: TransactionMutation,
};

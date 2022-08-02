import { QueryParameters } from "@types";
import { prisma } from "../config";
import { AccountMutation } from "./mutation";
import { AccountQuery } from "./query";

export * from "./mutation";
export * from "./query";
export { default as AccountSchema } from "./schema";

export const AccountResolvers = {
  Query: AccountQuery,
  Mutation: AccountMutation,
};

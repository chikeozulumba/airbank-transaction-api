import { AccountQuery } from "./query";

export * from "./query";
export { default as AccountSchema } from "./schema";

export const AccountResolvers = {
  Query: AccountQuery,
};

import { Account } from "@prisma/client";
import { RelationQueryParameters, QueryParameters } from "@types";
import { prisma } from "../config";

export const AccountQuery = {
  accounts: async (
    parent: unknown,
    {
      skip,
      take,
      relations = [],
      $skip = 0,
      $take = 5,
    }: QueryParameters & RelationQueryParameters
  ): Promise<Account[]> => {
    const include = {};
    relations.forEach(
      (relation) => (include[relation] = { skip: $skip, take: $take })
    );

    return await prisma.account.findMany({
      orderBy: {
        createdAt: "asc",
      },
      skip,
      take,
      ...(relations.length > 0 && { include }),
    });
  },
  account: async (
    parent: unknown,
    {
      id,
      relations = [],
      $skip = 0,
      $take = 5,
    }: QueryParameters & RelationQueryParameters
  ): Promise<Account> => {
    const include = {};
    relations.forEach(
      (relation) => (include[relation] = { skip: $skip, take: $take })
    );

    return await prisma.account.findUniqueOrThrow({
      where: { id },
      ...(relations.length > 0 && { include }),
    });
  },
};

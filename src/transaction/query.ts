import { Transaction } from "@prisma/client";
import {
  QueryParameters,
  RelationQueryParameters,
  TransactionQueryParameters,
} from "@types";
import { prisma } from "../config";

export const TransactionQuery = {
  transaction: async (
    parent: unknown,
    { id, relations = [] }: QueryParameters & RelationQueryParameters
  ): Promise<Transaction> => {
    const include: { [key: string]: boolean } = {};
    relations.forEach((relation) => (include[relation] = true));
    return await prisma.transaction.findUniqueOrThrow({
      where: { id },
      ...(relations.length > 0 && { include }),
    });
  },
  transactions: async (
    parent: unknown,
    {
      categoryId,
      accountId,
      skip,
      take,
      relations = [],
      date,
      startDate,
      endDate,
    }: QueryParameters & TransactionQueryParameters
  ): Promise<Transaction[]> => {
    const where = {};
    if (categoryId && !accountId) {
      where["categoryId"] = categoryId;
    }
    if (accountId && !categoryId) {
      where["accountId"] = accountId;
    }

    if (accountId && categoryId) {
      where["OR"] = [{ accountId: accountId }, { categoryId: categoryId }];
    }

    const include: { [key: string]: boolean } = {};
    relations.forEach((relation) => (include[relation] = true));

    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter["lte"] = new Date(endDate);
      dateFilter["gte"] = new Date(startDate);

      where["date"] = dateFilter;
    }

    return await prisma.transaction.findMany({
      where,
      orderBy: {
        date,
      },
      skip,
      take,
      ...(relations.length > 0 && { include }),
    });
  },
  transactionsCount: async (
    parent: unknown,
    { categoryId, accountId }: QueryParameters & TransactionQueryParameters
  ): Promise<{ count: number }> => {
    const where = {};
    if (categoryId && !accountId) {
      where["categoryId"] = categoryId;
    }
    if (accountId && !categoryId) {
      where["accountId"] = accountId;
    }

    if (accountId && categoryId) {
      where["OR"] = [{ accountId: accountId }, { categoryId: categoryId }];
    }

    return {
      count: await prisma.transaction.count({
        where,
      }),
    };
  },
};

import { PrismaClient } from "@prisma/client";
import { join } from "path";
import { chunk } from "lodash";
import { csvToArray } from "./utils";
import { Transaction } from "@types";

const prisma = new PrismaClient();

async function main() {
  try {
    const accounts = await csvToArray<"accounts">(
      join(__dirname, "data/accounts.csv")
    );
    const categories = await csvToArray<"categories">(
      join(__dirname, "data/categories.csv")
    );
    const transactions = await csvToArray<"transactions">(
      join(__dirname, "data/transactions.csv")
    );

    // Seed accounts and transactions
    await prisma.$transaction([
      prisma.account.createMany({ data: accounts }),
      prisma.category.createMany({ data: categories }),
    ]);

    // Chunk transactions data to reduce size.
    const transactionsChunk: Transaction[][] = chunk(transactions, 1000);
    await prisma.$transaction(
      transactionsChunk.map((transactions) =>
        prisma.transaction.createMany({
          data: transactions.map(({ categoryId, date, ...transaction }) => {
            return {
              ...transaction,
              categoryId: categoryId.length < 1 ? null : categoryId,
              date: new Date(date).toISOString(),
            };
          }),
        })
      )
    );
  } catch (error) {
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

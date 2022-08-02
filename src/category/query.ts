import { Category } from "@prisma/client";
import { QueryParameters, RelationQueryParameters } from "@types";
import { prisma } from "../config";

export const CategoryQuery = {
  category: async (
    parent: unknown,
    { id, relations = [] }: QueryParameters & RelationQueryParameters
  ): Promise<Category> => {
    const include = {};
    relations.forEach((relation) => (include[relation] = true));
    return await prisma.category.findUniqueOrThrow({
      where: { id },
      ...(relations.length > 0 && { include }),
    });
  },
  categories: async (
    parent: unknown,
    { skip, take }: QueryParameters
  ): Promise<Category[]> => {
    return await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
      skip,
      take,
    });
  },
};

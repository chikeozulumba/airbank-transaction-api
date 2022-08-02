import { CategoryQuery } from "./query";

export * from "./query";
export { default as CategorySchema } from "./schema";

export const Category = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  color: (parent) => parent.color,
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
};

export const CategoryResolvers = {
  Category,
  Query: CategoryQuery,
};

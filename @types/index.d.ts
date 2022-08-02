export type ICSVToArray = {
  accounts: Account[];
  categories: Category[];
  transactions: Transaction[];
};

export type Account = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Transaction = {
  id: string;
  accountId: string;
  categoryId: string;
  reference: string;
  amount: string;
  currency: string;
  date: Date | string;
};

export type QueryParameters = {
  id?: string;
  filter?: string | number;
  skip?: number;
  take?: number;
  limit?: number;
  relations?: string[];
};

export type RelationQueryParameters = {
  $skip?: number;
  $take?: number;
};

export type TransactionQueryParameters = {
  categoryId?: string;
  accountId?: string;
  date?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
};

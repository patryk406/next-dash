// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type ProductsTableType = {
  id: string;
  name: string;
  stock: number;
  sector: string;
  category: string;
  price: number;
  catalog_number: string;
  image_url: string;
  components:
    | {
        id: string;
        product_id: string;
        component_id: string;
        component_name: string;
        quantity: number;
      }[]
    | [];
};
export type ProductTransactionsTableType = {
  id: string;
  product_id: string;
  type: 'in' | 'out';
  quantity: number;
  date: string;
};

export type SectorTableType = {
  id: string;
  name: string;
  description: string;
};
export type CategoriesTableType = {
  id: string;
  name: string;
  description: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

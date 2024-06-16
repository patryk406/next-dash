import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import {
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  ProductsTableType,
  ProductTransactionsTableType,
} from './definitions';

import { formatCurrency } from './utils';

const ITEMS_PER_PAGE = 6;

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

// invoices data
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice);
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
// end of invoices data

// products data
export async function fetchProduct(id: string) {
  noStore();
  try {
    const product = await sql<ProductsTableType>`
        SELECT products.*, coalesce(jsonb_agg(product_components) FILTER (WHERE product_components.product_id IS NOT NULL), '[]') as components
        FROM products
        LEFT JOIN product_components ON products.id = product_components.product_id
        WHERE products.id = ${id}
        GROUP BY products.id
        `;

    const transactions = await sql<ProductTransactionsTableType>`
        SELECT * FROM product_transactions WHERE product_id = ${id}
        `;

    return {
      product: product.rows[0],
      transactions: transactions.rows,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchProductsPages(query: string = '') {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
        FROM products
        WHERE
        name ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<ProductsTableType>`
        SELECT products.*, coalesce(jsonb_agg(product_components) FILTER (WHERE product_components.product_id IS NOT NULL), '[]') as components
        FROM products
        LEFT JOIN product_components ON products.id = product_components.product_id
        WHERE products.name ILIKE ${`%${query}%`}
        GROUP BY products.id
        ORDER BY products.name ASC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;

    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

// data to fill form
export async function fetchProducts() {
  noStore();
  try {
    const products = await sql`SELECT id, name FROM products ORDER BY name ASC`;
    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}
// end of invoices data

// transactions data
export async function fetchTransactionsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
            FROM product_transactions
            WHERE
            product_name ILIKE ${`%${query}%`}
        `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of transactions.');
  }
}

export async function fetchFilteredTransactions(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const transactions = await sql<ProductTransactionsTableType>`
            SELECT * FROM product_transactions
            WHERE product_name ILIKE ${`%${query}%`}
            ORDER BY date DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
            `;

    return transactions.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transactions.');
  }
}
// end of transactions data
// sectors data
export async function fetchSectorsPages(query: string) {
  noStore();
  try {
    const count =
      await sql`SELECT COUNT(*) FROM sectors WHERE name ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of sectors.');
  }
}
export async function fetchSectors(query: string, currentPage: number) {
  noStore();
  try {
    const sectors =
      await sql`SELECT id, name, description FROM sectors ORDER BY name ASC`;
    return sectors.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sectors.');
  }
}
export async function fetchFilteredSectors(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sectors =
      await sql`SELECT id, name, description FROM sectors WHERE name ILIKE ${`%${query}%`} ORDER BY name ASC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return sectors.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch sectors.');
  }
}

// end of sectors data

// categories data
export async function fetchCategoriesPages(query: string) {
  noStore();
  try {
    const count =
      await sql`SELECT COUNT(*) FROM categories WHERE name ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of categories.');
  }
}

export async function fetchCategories(query: string) {
  noStore();
  try {
    const categories =
      await sql`SELECT id, name, description FROM categories ORDER BY name ASC`;
    return categories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

export async function fetchFilteredCategories(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const categories =
      await sql`SELECT id, name, description FROM categories WHERE name ILIKE ${`%${query}%`} ORDER BY name ASC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return categories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

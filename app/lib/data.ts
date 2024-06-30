import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import { Product, Sector, Transaction, User } from './definitions';

const ITEMS_PER_PAGE = 6;
// products data

export async function fetchProduct(id: string) {
  noStore();
  try {
    const product = await sql<Product>`
        SELECT *
        FROM products
        WHERE products.id = ${id}
        `;
    return {
      product: product.rows[0],
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
    const products = await sql<Product>`
        SELECT *
        FROM products
        WHERE products.name ILIKE ${`%${query}%`}
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
// end of products data

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
    const transactions = await sql<Transaction>`
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
      await sql<Sector>`SELECT id, name, description FROM sectors ORDER BY name ASC`;
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
// end of categories data
// users data

// suppliers data
export async function fetchSuppliersPages(query: string) {
  noStore();
  try {
    const count =
      await sql`SELECT COUNT(*) FROM suppliers WHERE name ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of suppliers.');
  }
}

export async function fetchSuppliers(query: string) {
  noStore();
  try {
    const suppliers =
      await sql`SELECT id, name, description FROM suppliers ORDER BY name ASC`;
    return suppliers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch suppliers.');
  }
}

export async function fetchFilteredSuppliers(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const suppliers =
      await sql`SELECT id, name, description FROM suppliers WHERE name ILIKE ${`%${query}%`} ORDER BY name ASC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    return suppliers.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch suppliers.');
  }
}
// end of suppliers data

// users data
export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
// end of users data

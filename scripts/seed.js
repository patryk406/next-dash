const { db } = require('@vercel/postgres');
const { users } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function dropTables(client) {
  try {
    // await client.sql`DROP TABLE IF EXISTS users;`;
    await client.sql`DROP TABLE IF EXISTS product_components CASCADE;`;
    await client.sql`DROP TABLE IF EXISTS products CASCADE;`;
    // await client.sql`DROP TABLE IF EXISTS transactions;`;
    // await client.sql`DROP TABLE IF EXISTS images;`;
    // await client.sql`DROP TABLE IF EXISTS categories;`;
    // await client.sql`DROP TABLE IF EXISTS sectors;`;
    console.log('Dropped all tables');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        stock INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        catalog_number VARCHAR(255) NOT NULL,
        sector VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "products" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

async function seedProductComponents(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS product_components (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_id UUID NOT NULL,
        component_id UUID NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products (id)
      );
    `;

    console.log(`Created "product_components" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding product components:', error);
    throw error;
  }
}

async function seedTransactions(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_id UUID NOT NULL,
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id),
        status VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "transactions" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding transactions:', error);
    throw error;
  }
}

async function seedImages(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS images (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_id UUID NOT NULL,
        url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id)
      );
    `;

    console.log(`Created "images" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding images:', error);
    throw error;
  }
}

async function seedCategories(client) {
  try {
    // Create the "categories" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      );
    `;
    console.log(`Created "categories" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

async function seedSectors(client) {
  try {
    // Create the "sectors" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS sectors (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      );
    `;

    console.log(`Created "sectors" table`);
    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding sectors:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await dropTables(client);
  await seedUsers(client);
  await seedCategories(client);
  await seedSectors(client);
  await seedProducts(client);
  await seedProductComponents(client);
  await seedTransactions(client);
  await seedImages(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

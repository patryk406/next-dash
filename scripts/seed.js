const { db } = require('@vercel/postgres');
const { users } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function dropTables(client) {
  try {
    // await client.sql`DROP TABLE IF EXISTS users;`;
    await client.sql`DROP TABLE IF EXISTS product_components CASCADE;`;
    await client.sql`DROP TABLE IF EXISTS products CASCADE;`;
    await client.sql`DROP TABLE IF EXISTS transactions;`;
    await client.sql`DROP TABLE IF EXISTS images;`;
    await client.sql`DROP TABLE IF EXISTS categories;`;
    await client.sql`DROP TABLE IF EXISTS sectors;`;
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
async function seedSuppliers(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS suppliers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      );
    `;

    console.log(`Created "suppliers" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding suppliers:', error);
    throw error;
  }
}
async function seedSets(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS Sets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        sku_code TEXT,
        height FLOAT,
        width FLOAT,
        depth FLOAT,
        price FLOAT NOT NULL,
        stock INTEGER NOT NULL,
        location_id UUID NOT NULL,
        components TEXT,
        working_hours INTEGER,
        in_development BOOLEAN,
        possible_quantities INTEGER,
        manufacturer TEXT,
        manufacturer_part_number TEXT,
        lead_time INTEGER,
        safety_stock INTEGER,
        status TEXT,
        category_id UUID NOT NULL,
        temporary_locked INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories (id),
        FOREIGN KEY (location_id) REFERENCES sectors (id)
      );
    `;

    console.log(`Created "Sets" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding Sets:', error);
    throw error;
  }
}
async function seedInventory(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS Products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        substitute TEXT,
        price FLOAT NOT NULL,
        stock INTEGER NOT NULL,
        min_stack INTEGER,
        max_stack INTEGER,
        location_id UUID NOT NULL,
        height FLOAT,
        width FLOAT,
        depth FLOAT,
        supplier_id UUID NOT NULL,
        weight FLOAT,
        category_id UUID NOT NULL,
        sku_code TEXT,
        qr_code TEXT,
        manufacturer TEXT,
        manufacturer_part_number TEXT,
        temporary_Locked INTEGER,
        FOREIGN KEY (category_id) REFERENCES categories (id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers (id),
        FOREIGN KEY (location_id) REFERENCES sectors (id)
      );
    `;
    console.log(`Created "Products" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding Products:', error);
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
async function seedLocations(client) {
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
async function seedTransactions(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        product_id UUID,
        set_id UUID,
        quantity INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id),
        FOREIGN KEY (set_id) REFERENCES sets (id),
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
        product_id UUID,
        set_id UUID,
        url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id),
        FOREIGN KEY (set_id) REFERENCES sets (id)
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

async function main() {
  const client = await db.connect();

  // await dropTables(client);

  await seedUsers(client);
  await seedCategories(client);
  await seedLocations(client);
  await seedSuppliers(client); // Move this line up
  await seedSets(client);
  await seedInventory(client);
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

'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// products section
export type ProductState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    min_stock?: string[];
    max_stock?: string[];
    location?: string[];
    height?: string[];
    width?: string[];
    depth?: string[];
    supplier?: string[];
    weight?: string[];
    category?: string[];
    sku_code?: string[];
    qr_code?: string[];
    manufacturer?: string[];
    manufacturer_part_number?: string[];
    temporary_locked?: string[];
    substitute?: string[];
  };
  message?: string | null;
};

const ProductFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  substitute: z.string(),
  price: z.number(),
  stock: z.number(),
  min_stock: z.number(),
  max_stock: z.number(),
  location: z.string(),
  height: z.number(),
  width: z.number(),
  depth: z.number(),
  supplier: z.string(),
  weight: z.number(),
  category: z.string(),
  sku_code: z.string(),
  manufacturer: z.string(),
  manufacturer_part_number: z.string(),
});

const CreateProduct = ProductFormSchema.omit({ id: true });
const UpdateProduct = ProductFormSchema.omit({ id: true });

export async function createProduct(
  prevState: ProductState,
  formData: FormData,
) {
  console.log('Before validation', formData);
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    substitute: formData.get('substitute'),
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock')),
    min_stock: parseInt(formData.get('min_stock') as string),
    max_stock: parseInt(formData.get('max_stock') as string),
    location: formData.get('location'),
    height: Number(formData.get('height')),
    width: Number(formData.get('width')),
    depth: Number(formData.get('depth')),
    supplier: formData.get('supplier'),
    weight: Number(formData.get('weight')),
    category: formData.get('category'),
    sku_code: formData.get('sku_code'),
    manufacturer: formData.get('manufacturer'),
    manufacturer_part_number: formData.get('manufacturer_part_number'),
  });
  if (!validatedFields.success) {
    console.log('Validation failed', validatedFields.error);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const {
    name,
    description,
    price,
    stock,
    substitute,
    min_stock,
    max_stock,
    location,
    height,
    width,
    depth,
    supplier,
    weight,
    category,
    sku_code,
    manufacturer,
    manufacturer_part_number,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO products (name, description, substitute, price, stock, min_stock, max_stock, location_id, height, width, depth, supplier_id, weight, category_id, sku_code, manufacturer, manufacturer_part_number, temporary_locked)
      VALUES (${name}, ${description}, ${substitute}, ${price}, ${stock}, ${min_stock}, ${max_stock}, ${location}, ${height}, ${width}, ${depth}, ${supplier}, ${weight}, ${category}, ${sku_code}, ${manufacturer}, ${manufacturer_part_number}, 0)
    `;

    console.log('After SQL query');
  } catch (error) {
    console.error('Error caught', error);
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduct(
  id: string,
  prevState: ProductState,
  formData: FormData,
) {
  const validatedFields = UpdateProduct.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    catalogNumber: formData.get('catalogNumber'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Product.',
    };
  }

  const { name, price, stock, catalogNumber } = validatedFields.data;

  try {
    await sql`
      UPDATE products
      SET name = ${name}, price = ${price}, stock = ${stock}, catalog_number = ${catalogNumber}, updated_at = NOW()
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Product.' };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteProduct(id: string) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath('/dashboard/products');
    return { message: 'Product Deleted.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Product.',
    };
  }
}

// end of products section

// sectors section

export type SectorState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const SectorFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const CreateSector = SectorFormSchema.omit({ id: true });
const UpdateSector = SectorFormSchema.omit({ id: true });

export async function createSector(prevState: SectorState, formData: FormData) {
  const validatedFields = CreateSector.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Sector.',
    };
  }
  const { name, description } = validatedFields.data;
  try {
    await sql`
      INSERT INTO sectors (name, description)
      VALUES (${name}, ${description})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Sector.',
    };
  }
  revalidatePath('/dashboard/sectors');
  redirect('/dashboard/sectors');
}

export async function updateSector(
  id: string,
  prevState: SectorState,
  formData: FormData,
) {
  const validatedFields = UpdateSector.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Sector.',
    };
  }

  const { name, description } = validatedFields.data;

  try {
    await sql`
      UPDATE sectors
      SET name = ${name}, description = ${description}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Sector.' };
  }

  revalidatePath('/dashboard/sectors');
  redirect('/dashboard/sectors');
}

export async function deleteSector(id: string) {
  try {
    await sql`DELETE FROM sectors WHERE id = ${id}`;
    revalidatePath('/dashboard/sectors');
    return { message: 'Sector Deleted.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Sector.',
    };
  }
}
// end of sectors section

// categories section
export type CategoryState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const CategoryFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const UpdateCategory = CategoryFormSchema.omit({ id: true });
const CreateCategory = CategoryFormSchema.omit({ id: true });

export async function createCategory(
  prevState: CategoryState,
  formData: FormData,
) {
  const validatedFields = CreateCategory.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }

  const { name, description } = validatedFields.data;

  try {
    await sql`
      INSERT INTO categories (name, description)
      VALUES (${name}, ${description})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category.',
    };
  }

  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function fetchCategory(id: string) {
  try {
    const category = await sql`
        SELECT * FROM categories WHERE id = ${id}
        `;

    return { category };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Fetch Category.',
    };
  }
}

export async function updateCategory(
  id: string,
  prevState: CategoryState,
  formData: FormData,
) {
  const validatedFields = UpdateCategory.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Category.',
    };
  }

  const { name, description } = validatedFields.data;

  try {
    await sql`
      UPDATE categories
      SET name = ${name}
      SET description = ${description}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Category.' };
  }

  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function deleteCategory(id: string) {
  try {
    await sql`DELETE FROM categories WHERE id = ${id}`;
    revalidatePath('/dashboard/categories');
    return { message: 'Category Deleted.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Category.',
    };
  }
}
// end of categories section

// suppliers section
export type SupplierState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const SupplierFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

const CreateSupplier = SupplierFormSchema.omit({ id: true });
const UpdateSupplier = SupplierFormSchema.omit({ id: true });

export async function createSupplier(
  prevState: SupplierState,
  formData: FormData,
) {
  const validatedFields = CreateSupplier.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Supplier.',
    };
  }

  const { name, description } = validatedFields.data;

  try {
    await sql`
      INSERT INTO suppliers (name, description)
      VALUES (${name}, ${description})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Supplier.',
    };
  }

  revalidatePath('/dashboard/suppliers');
  redirect('/dashboard/suppliers');
}

export async function updateSupplier(
  id: string,
  prevState: SupplierState,
  formData: FormData,
) {
  const validatedFields = UpdateSupplier.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Supplier.',
    };
  }

  const { name, description } = validatedFields.data;

  try {
    await sql`
      UPDATE suppliers
      SET name = ${name}, description = ${description}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Supplier.' };
  }

  revalidatePath('/dashboard/suppliers');
  redirect('/dashboard/suppliers');
}

export async function deleteSupplier(id: string) {
  try {
    await sql`DELETE FROM suppliers WHERE id = ${id}`;
    revalidatePath('/dashboard/suppliers');
    return { message: 'Supplier Deleted.' };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Supplier.',
    };
  }
}

// end of suppliers section

// authentication section
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

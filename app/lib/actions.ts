'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// invoices section
// const InvoiceFormSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });
//
// const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
// const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
//
// export async function createInvoice(prevState: State, formData: FormData) {
//   const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
//
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//   const date = new Date().toISOString().split('T')[0];
//
//   try {
//     await sql`
//     INSERT INTO invoices (customer_id, amount, status, date)
//     VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
//   `;
//
//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
//   } catch (error) {
//     return {
//       message: 'Database Error: Failed to Create Invoice.',
//     };
//   }
// }
//
// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
//
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }
//
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
//
//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }
//
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }
//
// export async function deleteInvoice(id: string) {
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Invoice Deleted.' };
//   } catch (error) {
//     return {
//       message: 'Database Error: Failed to Delete Invoice.',
//     };
//   }
// }
// end of invoices section

// products section
export type ProductState = {
  errors?: {
    name?: string[];
    price?: string[];
    stock?: string[];
    sectorId?: string[];
    categoryId?: string[];
    catalogNumber?: string[];
  };
  message?: string | null;
};

const ProductFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter a price greater than $0.' }),
  stock: z.coerce.number(),
  catalogNumber: z.string(),
  sector: z.string(),
  category: z.string(),
  mainImage: z.string() || null,
  images: z.array(z.string()) || null,
  status: z.enum(['active', 'disabled'], {
    invalid_type_error: 'Please select a product status.',
  }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const CreateProduct = ProductFormSchema.omit({ id: true });
const UpdateProduct = ProductFormSchema.omit({ id: true });

export async function createProduct(
  prevState: ProductState,
  formData: FormData,
) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    catalogNumber: formData.get('catalogNumber'),
    sector: formData.get('sector'),
    category: formData.get('category'),
    mainImage: formData.get('mainImage'),
    images: formData.getAll('images'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const {
    name,
    price,
    stock,
    catalogNumber,
    category,
    sector,
    images,
    mainImage,
    status,
  } = validatedFields.data;

  console.log('validatedFields', validatedFields.data);

  try {
    console.log('validatedFields', validatedFields.data);
    // await sql`
    //   INSERT INTO products (name, price, stock, catalog_number, created_at, updated_at, sector_id, category_id, status)
    //   VALUES (${name}, ${price}, ${stock}, ${catalogNumber}, NOW(), NOW(), ${sector}, ${category}, ${mainImage}, ${status})
    // `;
    //
    // revalidatePath('/dashboard/products');
    // redirect('/dashboard/products');
  } catch (error) {
    console.log('validatedFields', validatedFields.data);
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }
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

    revalidatePath('/dashboard/sectors');
    redirect('/dashboard/sectors');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Sector.',
    };
  }
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

    revalidatePath('/dashboard/categories');
    redirect('/dashboard/categories');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category.',
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

import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import { fetchCategories, fetchProducts, fetchSectors } from '@/app/lib/data';

export default async function Page() {
  const products = await fetchProducts();
  const categories = await fetchCategories('');
  const sectors = await fetchSectors('');
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Create Product',
            href: '/dashboard/product/create',
            active: true,
          },
        ]}
      />
      <Form products={products} categories={categories} sectors={sectors} />
    </main>
  );
}

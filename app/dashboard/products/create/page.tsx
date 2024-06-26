import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';
import {
  fetchCategories,
  fetchProducts,
  fetchSectors,
  fetchSuppliers,
} from '@/app/lib/data';

export default async function Page() {
  const suppliers = await fetchSuppliers('');
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
      <Form suppliers={suppliers} categories={categories} sectors={sectors} />
    </main>
  );
}

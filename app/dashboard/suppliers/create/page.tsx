import Form from '@/app/ui/suppliers/create-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Suppliers', href: '/dashboard/suppliers' },
          {
            label: 'Create Supplier',
            href: '/dashboard/sectors/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}

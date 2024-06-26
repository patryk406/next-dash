import Form from '@/app/ui/sectors/create-form';
import Breadcrumbs from '@/app/ui/common/breadcrumbs';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Sectors', href: '/dashboard/sectors' },
          {
            label: 'Create Sector',
            href: '/dashboard/sectors/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}

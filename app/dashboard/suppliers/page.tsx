import SectorsTable from '@/app/ui/suppliers/table';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateButton } from '@/app/ui/common/buttons';
import { Metadata } from 'next';
import { fetchSuppliersPages } from '@/app/lib/data';
import Pagination from '@/app/ui/common/pagination';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Suppliers',
};

export default async function SuppliersPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchSuppliersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          Warehouse Suppliers
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search name and description..." />
        <CreateButton location="suppliers" />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SectorsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

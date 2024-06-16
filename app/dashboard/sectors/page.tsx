import SectorsTable from '@/app/ui/sectors/table';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { CreateButton } from '@/app/ui/common/buttons';
import { Metadata } from 'next';
import { fetchSectorsPages } from '@/app/lib/data';
import Pagination from '@/app/ui/common/pagination';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sectors',
};

export default async function SectorsPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchSectorsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Warehouse Sectors</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search name and description..." />
        <CreateButton location="sectors" />
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

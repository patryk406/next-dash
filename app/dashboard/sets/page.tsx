// next
import { Metadata } from 'next';
// react
import { Suspense } from 'react';
// functions and assets
import { lusitana } from '@/app/ui/fonts';
import { fetchProductsPages } from '@/app/lib/data';
// components
import Pagination from '@/app/ui/common/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/sets/products-table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { CreateButton } from '@/app/ui/common/buttons';

export const metadata: Metadata = {
  title: 'Product Sets',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchProductsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Product Sets</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search set..." />
        <CreateButton location="sets" />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

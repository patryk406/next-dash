import { Metadata } from 'next';

import { lusitana } from '@/app/ui/fonts';

import CategoriesTable from '@/app/ui/categories/table';
import { Suspense } from 'react';
import Search from '@/app/ui/search';
import { CreateButton } from '@/app/ui/common/buttons';
import Pagination from '@/app/ui/common/pagination';
import { fetchCategoriesPages } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Categories',
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchCategoriesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>
          Products Categories
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search name and description..." />
        <CreateButton location="categories" />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoriesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

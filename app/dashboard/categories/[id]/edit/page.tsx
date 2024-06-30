import ProductDetails from '@/app/ui/products/product-details';
import TransactionsTable from '@/app/ui/products/transactions-table';
import { fetchCategory } from '@/app/lib/actions';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  //   get the product details
  const data = await fetchCategory(params.id);

  return <div>hi {params.id}</div>;
}

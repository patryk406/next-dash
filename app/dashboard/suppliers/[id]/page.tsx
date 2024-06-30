import { fetchProduct } from '@/app/lib/data';
import ProductDetails from '@/app/ui/products/product-details';
import TransactionsTable from '@/app/ui/products/transactions-table';

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  //   get the product details
  const data = await fetchProduct(params.id);

  return (
    <>
      <ProductDetails product={data.product} />
      <TransactionsTable transactions={data.transactions} />
    </>
  );
}

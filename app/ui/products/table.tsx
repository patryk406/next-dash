import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProducts } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  console.log(products[3].components);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={product.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${product.name}'s profile picture`}
                      />
                      <p>{product.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{product.stock}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(product.price)}
                    </p>
                    <p>{product.catalog_number}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={product.id} />
                    <DeleteInvoice id={product.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Stock
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Catalog ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Components
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product) => (
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${product.name}'s profile picture`}
                      />
                      <p>{product.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.stock}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.catalog_number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex gap-1">
                      {product.components.length === 0 && <p>None</p>}
                      {product.components.length > 0 &&
                        product?.components?.map((component) => (
                          <p key={component?.id}>
                            {component?.component_name} ({component?.quantity})
                          </p>
                        ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={product.id} />
                      <DeleteInvoice id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

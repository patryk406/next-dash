import { UpdateButton, DeleteButton } from '@/app/ui/common/buttons';
import { formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProducts } from '@/app/lib/data';
import TableLinkElement from '@/app/ui/products/table-link-element';
import { deleteProduct } from '@/app/lib/actions';

export default async function ProductTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

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
                      {/*temporary disabled*/}
                      {/*<Image*/}
                      {/*  src="/products/placeholder.png"*/}
                      {/*  className="mr-2 rounded-full"*/}
                      {/*  width={28}*/}
                      {/*  height={28}*/}
                      {/*  alt={`${product.name}'s profile picture`}*/}
                      {/*/>*/}
                      <p>{product.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{product.stock}</p>
                    <p className="text-sm text-gray-500">{product.min_stock}</p>
                    <p className="text-sm text-gray-500">{product.max_stock}</p>
                    <p className="text-sm text-gray-500">
                      {product.temporary_locked}
                    </p>
                    <p className="text-sm text-gray-500">{product.height}</p>
                    <p className="text-sm text-gray-500">{product.width}</p>
                    <p className="text-sm text-gray-500">{product.depth}</p>
                    <p className="text-sm text-gray-500">{product.weight}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{product.price}</p>
                    <p>{product.sku_code}</p>€
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateButton id={product.id} location="products" />
                    <DeleteButton
                      id={product.id}
                      deleteActionParam={deleteProduct}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {/* Add headers for the new fields here */}
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Substitute
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Min Stack
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Max Stack
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Location ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Height
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Width
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Depth
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Supplier ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Weight
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Category ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  SKU Code
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Manufacturer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Manufacturer Part Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Temporary Locked
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
                    <TableLinkElement id={product.id}>
                      <div className="flex items-center gap-3">
                        {/*<Image*/}
                        {/*  src="/products/placeholder.png"*/}
                        {/*  className="rounded-full"*/}
                        {/*  width={28}*/}
                        {/*  height={28}*/}
                        {/*  alt={`${product.name}'s profile picture`}*/}
                        {/*/>*/}
                        <p>{product.name}</p>
                      </div>
                    </TableLinkElement>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.substitute}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.price}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.sku_code}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.stock}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.min_stock}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.max_stock}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.height}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.width}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.depth}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.weight}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.temporary_locked}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.supplier_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.manufacturer}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.manufacturer_part_number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.location_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.category_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.sku_code}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateButton id={product.id} location="products" />
                      <DeleteButton
                        id={product.id}
                        deleteActionParam={deleteProduct}
                      />
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

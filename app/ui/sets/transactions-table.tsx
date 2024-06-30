import React from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import { ProductTransactionsTableType } from '@/app/lib/definitions';

export default function TransactionsTable({
  transactions,
}: {
  transactions: ProductTransactionsTableType[];
}) {
  if (transactions.length === 0) {
    return <div>No transactions made.</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Transaction ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Product ID
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Type
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {transaction.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.product_id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {transaction.quantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(transaction.date)}
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

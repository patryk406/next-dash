'use client';
// from next
import Link from 'next/link';

// from react
import { useState } from 'react';
import { useFormState } from 'react-dom';
// components
import { Button } from '@/app/ui/button';
// utility
import {
  CategoriesTableType,
  ProductsTableType,
  SectorTableType,
} from '@/app/lib/definitions';
import { createProduct } from '@/app/lib/actions';
import ProductComponentsField from '@/app/ui/products/components-field';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Form({
  products,
  categories,
  sectors,
}: {
  products: ProductsTableType[];
  categories: CategoriesTableType[];
  sectors: SectorTableType[];
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);
  const [selectedComponents, setSelectedComponents] = useState<
    { name: string; quantity: number }[]
  >([]);

  return (
    <form onSubmit={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Product Name
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="name-error"
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Stock */}
        <div className="mb-4">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Product Stock
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="stock"
              name="stock"
              type="number"
              placeholder="Enter product stock"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="stock-error"
            />
          </div>
          <div id="stock-error" aria-live="polite" aria-atomic="true">
            {state.errors?.stock &&
              state.errors.stock.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Product Price
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              placeholder="Enter product price"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="price-error"
            />
          </div>
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Catalog Number */}
        <div className="mb-4">
          <label
            htmlFor="catalog_number"
            className="mb-2 block text-sm font-medium"
          >
            Catalog Number
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="catalog_number"
              name="catalog_number"
              type="text"
              placeholder="Enter catalog number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="catalog_number-error"
            />
          </div>
          <div id="catalog_number-error" aria-live="polite" aria-atomic="true">
            {state.errors?.catalog_number &&
              state.errors.catalog_number.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/*Sector*/}
        <div className="mb-4">
          <label htmlFor="sector" className="mb-2 block text-sm font-medium">
            Sector
          </label>
          <select
            id="sector"
            name="sector"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
          >
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </select>
          <div id="sector-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sector &&
              state.errors.sector.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div id="category-error" aria-live="polite" aria-atomic="true">
            {state.errors?.category &&
              state.errors.category.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Components */}
        <div className="mb-4">
          <label
            htmlFor="components"
            className="mb-2 block text-sm font-medium"
          >
            Components
          </label>
          <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
            <ProductComponentsField
              products={products}
              onComponentsChange={setSelectedComponents}
            />
          </div>
        </div>
        {/*status*/}
        <div>
          <div className="mb-2 block text-sm font-medium">Product Status</div>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="disabled"
                  name="status"
                  type="radio"
                  value="disabled"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="disabled"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  disabled <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* You can add a form field for components if needed */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Product</Button>
      </div>
    </form>
  );
}

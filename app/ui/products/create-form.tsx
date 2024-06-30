'use client';
// from next
import Link from 'next/link';

// from framework
import { useFormState } from 'react-dom';
// components
import { Button } from '@/app/ui/button';
// utility
import { Category, Sector, Supplier } from '@/app/lib/definitions';
import { createProduct, ProductState } from '@/app/lib/actions';

export default function Form({
  suppliers,
  categories,
  sectors,
}: {
  suppliers: Supplier[];
  categories: Category[];
  sectors: Sector[];
}) {
  const initialState: ProductState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createProduct, initialState);

  return (
    <form action={dispatch}>
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

        {/* Product Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Product Description
          </label>
          <div className="relative mt-2 rounded-md">
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="description-error"
            />
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
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

        {/* Product Min Stock */}
        <div className="mb-4">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Product Min Stock
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="min_stock"
              name="min_stock"
              type="number"
              placeholder="Enter min product stock"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="stock-error"
            />
          </div>
          <div id="stock-error" aria-live="polite" aria-atomic="true">
            {state.errors?.min_stock &&
              state.errors.min_stock.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Max Stock */}
        <div className="mb-4">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Product Max Stock
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="max_stock"
              name="max_stock"
              type="number"
              placeholder="Enter max product stock"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="stock-error"
            />
          </div>
          <div id="stock-error" aria-live="polite" aria-atomic="true">
            {state.errors?.max_stock &&
              state.errors.max_stock.map((error: string) => (
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
          <label htmlFor="sku_code" className="mb-2 block text-sm font-medium">
            SKU Code
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="sku_code"
              name="sku_code"
              type="text"
              placeholder="Enter sku code"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="sku_code-error"
            />
          </div>
          <div id="sku_code-error" aria-live="polite" aria-atomic="true">
            {state.errors?.sku_code &&
              state.errors.sku_code.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product weight*/}
        <div className="mb-4">
          <label htmlFor="weight" className="mb-2 block text-sm font-medium">
            Product Weight
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="weight"
              name="weight"
              type="number"
              placeholder="Enter product weight"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="weight-error"
            />
          </div>
          <div id="weight-error" aria-live="polite" aria-atomic="true">
            {state.errors?.weight &&
              state.errors.weight.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Width */}
        <div className="mb-4">
          <label htmlFor="width" className="mb-2 block text-sm font-medium">
            Product Width
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="width"
              name="width"
              type="number"
              placeholder="Enter product width"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="width-error"
            />
          </div>
          <div id="width-error" aria-live="polite" aria-atomic="true">
            {state.errors?.width &&
              state.errors.width.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Height */}
        <div className="mb-4">
          <label htmlFor="height" className="mb-2 block text-sm font-medium">
            Product Height
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="height"
              name="height"
              type="number"
              placeholder="Enter product height"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="height-error"
            />
          </div>
          <div id="height-error" aria-live="polite" aria-atomic="true">
            {state.errors?.height &&
              state.errors.height.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product depth */}
        <div className="mb-4">
          <label htmlFor="depth" className="mb-2 block text-sm font-medium">
            Product Depth
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="depth"
              name="depth"
              type="number"
              placeholder="Enter product depth"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="depth-error"
            />
          </div>
          <div id="depth-error" aria-live="polite" aria-atomic="true">
            {state.errors?.depth &&
              state.errors.depth.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Substitute */}
        <div className="mb-4">
          <label
            htmlFor="substitute"
            className="mb-2 block text-sm font-medium"
          >
            Product Substitute
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="substitute"
              name="substitute"
              type="text"
              placeholder="Enter product substitute"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="substitute-error"
            />
          </div>
          <div id="substitute-error" aria-live="polite" aria-atomic="true">
            {state.errors?.substitute &&
              state.errors.substitute.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Product Manufacturer */}
        <div className="mb-4">
          <label
            htmlFor="manufacturer"
            className="mb-2 block text-sm font-medium"
          >
            Product Manufacturer
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="manufacturer"
              name="manufacturer"
              type="text"
              placeholder="Enter product manufacturer"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="manufacturer-error"
            />
          </div>
          <div id="manufacturer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.manufacturer &&
              state.errors.manufacturer.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/*Manufacturer Part Number*/}
        <div className="mb-4">
          <label
            htmlFor="manufacturer_part_number"
            className="mb-2 block text-sm font-medium"
          >
            Manufacturer Part Number
          </label>
          <div className="relative mt-2 rounded-md">
            <input
              id="manufacturer_part_number"
              name="manufacturer_part_number"
              type="text"
              placeholder="Enter manufacturer part number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="manufacturer_part_number-error"
            />
          </div>
          <div
            id="manufacturer_part_number-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.manufacturer_part_number &&
              state.errors.manufacturer_part_number.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        {/* Supplier */}
        <div className="mb-4">
          <label htmlFor="supplier" className="mb-2 block text-sm font-medium">
            Supplier
          </label>
          <select
            id="supplier"
            name="supplier"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
          >
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          <div id="supplier-error" aria-live="polite" aria-atomic="true">
            {state.errors?.supplier &&
              state.errors.supplier.map((error: string) => (
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
            id="location"
            name="location"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
          >
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
          <div id="sector-error" aria-live="polite" aria-atomic="true">
            {state.errors?.location &&
              state.errors.location.map((error: string) => (
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
              <option key={category.id} value={category.id}>
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
        {/* You can add a form field for components if needed */}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Product</Button>
      </div>
    </form>
  );
}

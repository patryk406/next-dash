import Image from 'next/image';
import { ProductsTableType } from '@/app/lib/definitions';

export default function ProductDetails({
  product,
}: {
  product: ProductsTableType;
}) {
  return (
    <div className="p-6">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <Image
            src="/products/placeholder.png"
            alt={product.name}
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="w-1/2 pl-4">
          <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
          <p className="mb-2">Catalog Number: {product.catalog_number}</p>
          <p className="mb-2">Stock: {product.stock}</p>
          <p className="mb-2">Price: ${product.price}</p>
          {product?.components && (
            <>
              <h2 className="mb-2 text-xl font-bold">Components</h2>
              <ul>
                {product.components.map((component) => (
                  <li key={component.id}>
                    {component.component_name} ({component.quantity})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';

function ProductComponentsField({ products, onComponentsChange }: any) {
  const [components, setComponents] = useState([]);

  const addComponent = () => {
    setComponents([...components, { product: '', quantity: 1 }]);
  };

  const updateComponent = (index, field, value) => {
    const newComponents = [...components];
    newComponents[index][field] = value;
    setComponents(newComponents);
    onComponentsChange(newComponents);
  };

  const removeComponent = (index) => {
    const newComponents = [...components];
    newComponents.splice(index, 1);
    setComponents(newComponents);
    onComponentsChange(newComponents);
  };

  return (
    <div>
      {components.map((component, index) => (
        <div key={index} className="mb-2 flex items-center gap-4">
          <select
            value={component.product}
            onChange={(e) => updateComponent(index, 'product', e.target.value)}
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={component.quantity}
            onChange={(e) => updateComponent(index, 'quantity', e.target.value)}
            className="block w-20 rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2"
          />
          <button
            type="button"
            onClick={() => removeComponent(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addComponent}
        className="text-blue-500 hover:text-blue-700"
      >
        Add component
      </button>
    </div>
  );
}

export default ProductComponentsField;

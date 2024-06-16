export default function Autocomplete({
  options,
  onSelect,
  label,
  placeholder,
  error,
  value,
}: {
  options: any[];
  onSelect: (value: string) => void;
  label: string;
  placeholder: string;
  error?: string;
  value?: string | object;
}) {
  //     first we need to check if the options are string or object, if it's object then we need to get the name from the object

  return (
    <div className="mb-4">
      <label htmlFor="components" className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
        <input
          id="components"
          name="components"
          type="text"
          placeholder={placeholder}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
          defaultValue=""
          aria-describedby="components-error"
        />
      </div>
      <div id="components-error" aria-live="polite" aria-atomic="true">
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export function CreateButton({ location }: { location: string }) {
  return (
    <Link
      href={`/dashboard/${location}/create`}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create {location}</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateButton({
  id,
  location,
}: {
  id: string;
  location: string;
}) {
  return (
    <Link
      href={`/dashboard/${location}/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton({
  id,
  deleteActionParam,
}: {
  id: string;
  deleteActionParam: (id: string) => void;
}) {
  const deleteAction = deleteActionParam.bind(null, id);
  return (
    <form action={deleteAction}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

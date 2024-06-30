'use client';
import React from 'react';
import Link from 'next/link';

export default function TableLinkElement({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return <Link href={`/dashboard/products/${id}`}>{children}</Link>;
}

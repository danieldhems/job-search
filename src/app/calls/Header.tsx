"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CallsHeader() {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/add`}>Add a call</Link>
  )
}
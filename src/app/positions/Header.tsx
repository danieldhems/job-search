"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PositionsHeader() {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/add`}>Add a position</Link>
  )
}
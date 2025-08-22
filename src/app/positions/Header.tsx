"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PositionsHeader() {
  const pathname = usePathname();

  return (
    <div className="mb-3">
      <Link href={`${pathname}/add`}>Add a position</Link>
    </div>
  )
}
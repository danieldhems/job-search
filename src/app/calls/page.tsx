"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Calls() {
  const pathname = usePathname();

  return (
    <>
      <Link href={`${pathname}/add`}>Add a call</Link>
    </>
  )
}
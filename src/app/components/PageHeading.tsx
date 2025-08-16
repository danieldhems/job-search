"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function sentenceCase(str: string): string {
  const firstChar = str.charAt(0);
  return firstChar.toUpperCase() + str.substring(1);
}

export function Breadcrumbs({ pathSegments }: { pathSegments: string[] }) {
  // Generate path string based on current path segment.
  // This allows each breadcrumb link to point to its respective route.
  const getPathByIndex = (segments: string[], index: number) => {
    let path = "/";

    for (let i = 0; i <= index; i++) {
      path += segments[i];
      if (i < index) {
        path += "/";
      }
    }

    return path;
  }

  const isCurrentPath = (str: string, segments: string[]) => str === segments[segments.length - 1];

  const trailingSlash = (pathSegments: string[], index: number) => index < pathSegments.length - 1 && " / "

  return (
    <ul className="flex">
      {pathSegments.map((segment: string, index: number) => (
        <li key={`breadcrumb-${index}`} className="mr-1">
          {isCurrentPath(segment, pathSegments) ? (
            sentenceCase(segment)
          ) : (
            <Link href={getPathByIndex(pathSegments, index)}>
              {sentenceCase(segment)}
              {trailingSlash(pathSegments, index)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function PageHeading() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((s: string) => s !== "");
  const routeName = pathname === "/"
    ? "Dashboard"
    : sentenceCase(segments[segments.length - 1]);

  return (
    <>
      <header className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">{routeName}</h1>
        </div>
      </header>
      <nav id="breadcrumn" className="px-6 pt-6">
        <Breadcrumbs pathSegments={segments} />
      </nav>
    </>
  )
}
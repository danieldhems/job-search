import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="calls">Calls</Link>
        </li>
        <li>
          <Link href="agents">Agents</Link>
        </li>
        <li>
          <Link href="positions">Positions</Link>
        </li>
      </ul>
    </nav>
  )
}
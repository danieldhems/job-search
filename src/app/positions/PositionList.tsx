"use client";

export default function positionList({ positions }) {
  console.log("positions", positions)
  const positionList = positions.map((position, index: number) => (
    <li key={`position-${index}`} className="mb-3">
      <h3></h3>
      <p></p>
    </li>
  ));

  return (
    <ul>
      {positionList}
    </ul>
  )
}
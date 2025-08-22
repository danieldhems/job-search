"use client";

export default function positionList({ positions }) {
  console.log("positions", positions)
  const positionList = positions.map((position, index: number) => {
    const {
      jobTitle,
      jobDescription,
      jobType,
      salary,
      location,
      client
    } = position;

    return (
      <li key={`position-${index}`} className="mb-3">
        <h3>{jobTitle}</h3>
        <p>{salary}</p>
        <p>{jobDescription}</p>
      </li>
    )
  });

  return (
    <ul>
      {positionList}
    </ul>
  )
}
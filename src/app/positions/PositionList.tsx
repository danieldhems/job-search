"use client";

export default function positionList({ positions }) {
  const positionList = positions.map((position, index: number) => {
    const {
      jobTitle,
      jobDescription,
      jobType,
      salary,
      location,
      client,
      jobSpecFilePath,
    } = position;

    return (
      <li key={`position-${index}`} className="mb-3">
        <h3>{jobTitle}</h3>
        <p>{salary}</p>
        <p>{jobDescription}</p>
        {jobSpecFilePath && <a href={jobSpecFilePath}>View job spec</a>}
      </li>
    )
  });

  return (
    <ul>
      {positionList}
    </ul>
  )
}
"use client";

export default function positionList({ positions }) {
  async function onAddInterview(position) {
    const { id, agentId } = position;

    const request = fetch("")
  }

  const positionList = positions.map((position, index: number) => {
    const {
      id,
      agentId,
      jobTitle,
      jobDescription,
      jobType,
      salary,
      location,
      client,
      jobSpecFilePath,
    } = position;

    const

    return (
      <li key={`position-${index}`} className="mb-3">
        <h3>{jobTitle}</h3>
        <p>{salary}</p>
        {jobSpecFilePath && <a href={jobSpecFilePath}>View job spec</a>}
        {jobSpecFilePath && <a href={jobSpecFilePath}>View job spec</a>}
        <button onClick={() => onAddInterview(position)}>Add interview</button>
      </li>
    )
  });

  return (
    <ul>
      {positionList}
    </ul>
  )
}
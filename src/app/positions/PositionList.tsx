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

    return (
      <li key={`position-${index}`} className="flex mb-3">
        <div className="column--job-title flex-2">
          <a href={`/positions/${id}`}>{jobTitle}</a>
        </div>
        <div className="column--job-salary flex-1">{salary}</div>
        <div className="column--job-spec-file flex-1">
          {jobSpecFilePath && <a href={jobSpecFilePath}>View job spec</a>}
        </div>
        <div className="column--job-actions flex-1">
          <button onClick={() => onAddInterview(position)}>Add interview</button>
        </div>
      </li>
    )
  });

  return (
    <ul>
      {positionList}
    </ul>
  )
}
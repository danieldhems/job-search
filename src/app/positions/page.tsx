import PositionList from "./PositionList";
import Header from "./Header";

export default async function Calls() {
  const data = await fetch("http://localhost:3000/api/mysql/positions");
  const positions = await data.json();

  const transformedPositions = positions.map((position) => ({
    jobTitle: position.job_title,
    jobDescription: position.job_description,
    jobType: position.job_type,
    salary: position.salary,
    location: position.location,
    client: position.client,
  }))

  return (
    <>
      <Header />
      <PositionList positions={transformedPositions} />
    </>
  )
}
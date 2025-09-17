import Header from "../Header";

export default async function PositionPage({
  params,
}: {
  params: Promise<{ positionId: string }>
}) {
  const { positionId } = await params;
  const request = await fetch(`http://localhost:3000/api/mysql/position/${positionId}`);
  const data = await request.json();

  const {
    id,
    job_title,
    job_description,
    job_type,
    salary,
    location,
    client,
    job_spec_file_path,
  } = data[0];

  return (
    <>
      <h1>{job_title}</h1>
    </>
  )
}
import { AddPositionForm } from "./AddPositionForm";

export default async function AddPositionPage() {
  const request = await fetch("http://localhost:3000/api/mysql/agents");
  const agentsData = await request.json();

  const agents = agentsData.map((result) => ({
    id: result.id,
    firstName: result.first_name,
    lastName: result.last_name,
    company: result.company,
    email: result.email,
    phoneNumber: result.phone_number,
    mobileNumber: result.mobile_number,
  }));

  return (
    <>
      <h1 className="mb-3">Add a position</h1>
      <AddPositionForm agents={agents} />
    </>
  )
}
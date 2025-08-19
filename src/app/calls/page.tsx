import CallList from "./CallList";
import Header from "./Header";

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/mysql/calls");
  const calls = await data.json();

  return (
    <>
      <Header />
      <h2>Calls received</h2>
      <CallList calls={calls} />
    </>
  )
}
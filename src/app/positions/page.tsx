import PositionList from "./PositionList";
import Header from "./Header";

export default async function Calls() {
  const data = await fetch("http://localhost:3000/api/mysql/positions");
  const positions = await data.json();

  return (
    <>
      <Header />
      <PositionList positions={positions} />
    </>
  )
}
import AgentList from "./AgentList";
import Header from "./Header";

export default async function Calls() {
  const data = await fetch("http://localhost:3000/api/mysql/agents");
  const agents = await data.json();

  return (
    <>
      <Header />
      <AgentList agents={agents} />
    </>
  )
}
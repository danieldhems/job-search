"use client";

export default function AgentList({ agents }) {
  const agentList = agents.map((agent, index: number) => (
    <li key={`agent-${index}`} className="mb-3">
      <h3>{agent.firstName} {agent.lastName}</h3>
      <p>Company: {agent.company}<br />  Email: <a href={`mailto:${agent.email}`}>{agent.email}</a><br />Phone number: {agent.phoneNumber}
      </p>
    </li>
  ));

  return (
    <ul>
      {agentList}
    </ul>
  )
}
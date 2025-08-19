"use client";

export default function AgentList({ agents }) {
  const agentList = agents.map((agent, index: number) => (
    <li key={`agent-${index}`}></li>
  ));

  return (
    <ul>
      {agentList}
    </ul>
  )
}
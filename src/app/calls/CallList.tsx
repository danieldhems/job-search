"use client";

export default function CallList({ calls }) {
  const callList = calls.map((call, index: number) => {
    const { received_at, phone_number, agent_first_name, agent_last_name, agent_company_name } = call;
    return (
      <li key={`call-${index}`}>
        <p>
          Received {received_at} from number {phone_number}
          Agent: {agent_first_name}<br />
          Agent: {agent_last_name}<br />
          Company: {agent_company_name}<br />
        </p>
      </li>
    )
  });

  return (
    <ul>
      {callList}
    </ul>
  )
}
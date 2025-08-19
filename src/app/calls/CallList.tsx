"use client";

export default function ({ calls }) {
  const callList = calls.map((call, index: number) => (
    <li key={`call-${index}`}>Received {call.receivedAt} from number {call.phone_number}</li>
  ));

  return (
    <ul>
      {callList}
    </ul>
  )
}
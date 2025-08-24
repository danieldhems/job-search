"use client";

import { FormEvent } from "react";

export default function SignupForm() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;
    const data = {
      emailAddress: form.email_address.value,
      passport: form.password.value,
    };

    const request = await fetch('/api/mysql/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Handle response if necessary
    const response = await request.json();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label>Email address</label>
        <input type="text" name="email_address" id="input-phone-number" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" name="password" id="input-agent-name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <input type="submit"></input>
      </div>
    </form>
  )
}
"use client";

import { FormEvent } from "react";

export default function AddCall() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;
    const data = {
      phoneNumber: form.phone_number.value,
      recruiterName: form.recruiter_name.value,
      notes: form.notes.value,
    };

    const request = await fetch('/api/mysql/calls', {
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
        <label>Phone number</label>
        <input type="number" name="phone_number" id="input-phone-number" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <label>Recruiter name</label>
        <input type="text" name="recruiter_name" id="input-recruiter-name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <label>Notes</label>
        <textarea id="notes" name="notes" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></textarea>
      </div>
      <div className="mb-3">
        <input type="submit"></input>
      </div>
    </form>
  )
}
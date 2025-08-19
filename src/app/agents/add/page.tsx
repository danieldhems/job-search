"use client";

import { FormEvent } from "react";

export default function AddAgent() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;
    const data = {
      firstName: form.first_name.value,
      lastName: form.last_name.value,
      mobileNumber: form.mobile_number.value,
      phoneNumber: form.phone_number.value,
      email: form.email.value,
      company: form.company.value,
    };

    const request = await fetch('/api/mysql/agents', {
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
    <>
      <h1 className="mb-3">Add an agent</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input type="text" name="first_name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input type="text" name="last_name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
        </div>
        <div className="mb-3">
          <label>Mobile number</label>
          <input type="number" name="mobile_number" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
        </div>
        <div className="mb-3">
          <label>Phone number</label>
          <input type="number" name="phone_number" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
        </div>
        <div className="mb-3">
          <label>Company</label>
          <input type="text" name="company" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
        </div>
        <div className="mb-3">
          <input type="submit"></input>
        </div>
      </form>
    </>
  )
}
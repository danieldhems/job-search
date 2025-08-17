import { FormEvent } from "react";

export default function AddCall() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/mysql/calls', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json();
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
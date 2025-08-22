"use client";

import { FormEvent } from "react";

export function AddPositionForm({ agents }) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;
    const agentOptions = form.agent_id.options;
    const jobTypeOptions = form.job_type.options;
    const data = {
      jobTitle: form.job_title.value,
      jobDescription: form.job_description.value,
      jobType: parseInt(jobTypeOptions[form.job_type.selectedIndex].value),
      salary: form.salary.value,
      client: form.client.value,
      location: form.location.value,
      agentId: parseInt(agentOptions[form.agent_id.selectedIndex].value),
    };

    const request = await fetch('/api/mysql/positions', {
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
        <label>Job title</label>
        <input type="text" name="job_title" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <label>Job type</label>
        <select name="job_type" className="block py-2">
          <option value="">Select</option>
          <option value="0">Permanent</option>
          <option value="1">Contract</option>
        </select>
        <div className="radio">
          <label>
            None
            <input type="radio" name="job_type" value="" />
          </label>
          <label>
            Permanent
            <input type="radio" name="job_type" value="0" />
          </label>
          <label>
            Contract
            <input type="radio" name="job_type" value="1" />
          </label>
        </div>
      </div>
      <div className="mb-3">
        <label>Salary</label>
        <input type="text" name="salary" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <label>Client</label>
        <input type="text" name="client" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <label>Location</label>
        <input type="text" name="location" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <label>Agent</label>
        <select name="agent_id" className="block py-2">
          <option key="agent-empty">Select</option>
          {agents.map((agent, index: number) => (
            <option key={`agent-${index}`} value={agent.id}>{agent.firstName} {agent.lastName}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Job Description</label>
        <input type="text" name="job_description" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <label>Links</label>
        <textarea name="links" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></textarea>
      </div>
      <div className="mb-3">
        <label>Job spec</label>
        <input type="file" name="job_spec_file" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <input type="submit"></input>
      </div>
    </form>
  )
}
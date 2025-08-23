"use client";

import { FormEvent, useState } from "react";

export function AddPositionForm({ agents }) {
  const [jobSpecFilePath, setJobSpecFilePath] = useState<string>("");

  async function onFileInputChange(event: FormEvent<HTMLInputElement>) {
    const file = (event.target as HTMLInputElement).files;

    if (file) {
      const formData = new FormData();
      formData.append("file", file[0]);

      const request = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle response if necessary
      const response = await request.json();
      setJobSpecFilePath(response.filePath);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.target as HTMLFormElement;
    const agentOptions = form.agent_id.options;

    const data = {
      jobTitle: form.job_title.value,
      jobDescription: form.job_description.value,
      jobType: parseInt(form.job_type.value),
      salary: form.salary.value,
      client: form.client.value,
      location: form.location.value,
      agentId: parseInt(agentOptions[form.agent_id.selectedIndex].value),
      jobSpecFilePath,
    };

    const request = await fetch('/api/mysql/positions', {
      method: 'POST',
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
        <input type="file" name="job_spec_file" onChange={onFileInputChange} className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></input>
      </div>
      <div className="mb-3">
        <input type="submit"></input>
      </div>
    </form>
  )
}
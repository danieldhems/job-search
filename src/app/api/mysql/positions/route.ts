import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(request: Request) {
  const connection = await mysql.createConnection({
    user: "jobsearch1",
    password: "Cat09021988",
    host: "localhost",
    database: "job_search"
  });

  try {
    const [results] = await connection.query("SELECT * FROM positions");
    console.log("positions query result", results);

    return NextResponse.json(results);
  } catch (error) {
    console.log("positions query error", error)
    const response = {
      error,
      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 })
  }
};

export async function POST(request: Request) {
  const connection = await mysql.createConnection({
    user: "jobsearch1",
    password: "Cat09021988",
    host: "localhost",
    database: "job_search"
  });

  let response;

  try {
    console.log("POST api/positions request");

    const {
      jobTitle,
      jobDescription,
      salary,
      location,
      client,
      jobType,
      agentId,
      jobSpecFilePath,
    } = await request.json();

    const query = `
      INSERT INTO positions
      (
        job_title, 
        job_description,
        salary,
        client,
        location,
        job_type,
        agent_id,
        job_spec_file_path
      )
      VALUES
      (
        '${jobTitle}', 
        '${jobDescription}', 
        '${salary}', 
        '${location}', 
        '${client}', 
        '${jobType}', 
        '${agentId}',
        '${jobSpecFilePath}'
      );
    `;

    const [results] = await connection.execute(query);

    response = results;
  } catch (error) {
    console.log("positions query error", error)
    response = {
      error,
      returnedStatus: 200,
    };
  }

  connection.end();

  return NextResponse.json(response);
};
import { NextResponse } from "next/server";
import mysql, { ResultSetHeader } from "mysql2/promise";

export async function GET(request: Request) {
  const connection = await mysql.createConnection({
    user: "jobsearch1",
    password: "Cat09021988",
    host: "localhost",
    database: "job_search"
  });

  try {
    const query = `
      SELECT 
        interviews.id as call_id,
        interviews.scheduled_datetime,
        interviews.stage,
        interviews.type,
        interviews.location,
        positions.job_title,
        positions.job_type,
        agents.id as agent_id,
        agents.first_name as agent_first_name,
        agents.last_name as agent_last_name,
        agents.phone_number,
        agencies.name as agent_company_name 
      FROM interviews
      LEFT JOIN positions on interviews.position_id=positions.id
      LEFT JOIN agents ON interviews.agent_id=agents.id
      LEFt JOIN agencies ON agents.company_id-agencies.id
    `;
    const [results] = await connection.query(query);
    console.log("interviews query result", results);

    return NextResponse.json(results);
  } catch (error) {
    console.log("interviews query error", error)
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
    const {
      agentId,
      positionId,
      stage,
      type,
      location,
      scheduled_datetime,
    } = await request.json();

    const query = `
      INSERT INTO interviews (
        agent_id,
        position_id,
        stage,
        type,
        location,
        scheduled_datetime,
      ) VALUES (
        '${agentId}',
        '${positionId}',
        '${stage}',
        '${type}',
        '${location}',
        '${scheduled_datetime}'
      );
    `;

    const [result] = await connection.execute<ResultSetHeader>(query);

    response = {
      success: true,
      insertId: result.insertId,
    };
  } catch (error) {
    console.log("interviews query error", error)
    response = {
      error,
      returnedStatus: 200,
    };
  }

  connection.end();

  return NextResponse.json(response);
};
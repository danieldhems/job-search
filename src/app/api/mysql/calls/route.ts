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
    const [results] = await connection.query(`
      SELECT calls.id as call_id, calls.phone_number, calls.received_at, agents.id as agent_id, agents.first_name as agent_first_name, agents.last_name as agent_last_name, recruitment_companies.name as agent_company_name, recruitment_companies.location as agent_company_location
      FROM calls
      LEFT JOIN agents ON calls.agent_id=agents.id
      LEFt JOIN recruitment_companies ON agents.company_id-recruitment_companies.id
    `);
    console.log("calls query result", results);

    return NextResponse.json(results);
  } catch (error) {
    console.log("calls query error", error)
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
    console.log("POST api/calls request");

    const { phoneNumber, agentFirstName, agentLastName, agentCompany, position, notes } = await request.json();

    let companyId, agentId, callId;

    // First create company record if data has been provided
    if (agentCompany) {
      const agentCompanyQuery = `
        INSERT INTO recruitment_companies (
          name
        ) VALUES (
          '${agentCompany}'
        )
      `;

      const [result] = await connection.execute<ResultSetHeader>(agentCompanyQuery);
      if (result) {
        companyId = result.insertId;
      }
    }

    // Save agent's details
    const agentQuery = `
      INSERT INTO agents (
        first_name,
        last_name,
        company_id
      ) VALUES (
        '${agentFirstName}',
        '${agentLastName}',
        '${companyId}'
      )
    `;

    const [result] = await connection.execute<ResultSetHeader>(agentQuery);
    if (result) {
      agentId = result.insertId;
    }

    if (agentId) {
      const query = `
        INSERT INTO calls (
          phone_number, 
          agent_id,
          position,
          notes
        ) VALUES (
         '${phoneNumber}',
         '${agentId}',
         '${position}',
         '${notes}'
         );
      `;
      const [result] = await connection.execute<ResultSetHeader>(query);
      callId = result.insertId;
    }

    response = {
      success: true,
      insertId: callId,
    };
  } catch (error) {
    console.log("calls query error", error)
    response = {
      error,
      returnedStatus: 200,
    };
  }

  connection.end();

  return NextResponse.json(response);
};
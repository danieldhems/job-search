import { NextRequest, NextResponse } from "next/server";
import mysql, { ResultSetHeader } from "mysql2/promise";


export async function GET(request: NextRequest) {
  const connection = await mysql.createConnection({
    user: "jobsearch1",
    password: "Cat09021988",
    host: "localhost",
    database: "job_search"
  });

  try {
    const [results] = await connection.query("SELECT * FROM agents");

    return NextResponse.json(results);
  } catch (error) {
    console.log("agents query error", error)
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
    console.log("POST api/agents request");

    const {
      firstName,
      lastName,
      mobileNumber,
      phoneNumber,
      company,
      email,
    } = await request.json();

    const query = `
      INSERT INTO agents (
        first_name, 
        last_name, 
        mobile_number, 
        phone_number, 
        company,
        email
      ) VALUES (
        '${firstName}', 
        '${lastName}', 
        '${mobileNumber}', 
        '${phoneNumber}', 
        '${company}', 
        '${email}'
      );`;
    const [results] = await connection.execute<ResultSetHeader>(query);

    response = {
      success: true,
      insertId: results.insertId,
    };
  } catch (error) {
    console.log("agents query error", error)
    response = {
      error,
      returnedStatus: 200,
    };
  }

  connection.end();

  return NextResponse.json(response);
};
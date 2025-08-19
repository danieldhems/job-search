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
    const [results] = await connection.query("SELECT * FROM calls");
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

    const { phoneNumber, notes } = await request.json();

    const query = `INSERT INTO calls (phone_number, notes) VALUES ('${phoneNumber}', '${notes}');`;
    const [results] = await connection.execute(query);

    response = results;
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
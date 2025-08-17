import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";


export async function GET(request: NextRequest) {
  const connection = await mysql.createConnection({
    user: "jobsearch1",
    password: "Cat09021988",
    host: "localhost",
    database: "job_search"
  });

  try {
    const [results] = await connection.query("SELECT * FROM agents");
    console.log("agents query result", results);

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
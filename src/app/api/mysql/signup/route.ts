import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request, res: NextResponse) {
  const connection = await mysql.createConnection({
    user: "jobsearch1",
    password: "Cat09021988",
    host: "localhost",
    database: "job_search"
  });

  try {
    const query = `
      INSERT INTO users
      
    `;

    const [results] = await connection.query(query);
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
}
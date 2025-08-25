import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import * as bcrypt from "bcrypt";

export async function POST(req: Request, res: NextResponse) {
  const connection = await mysql.createConnection({
    user: "jobsearch1",
    password: "Cat09021988",
    host: "localhost",
    database: "job_search"
  });

  try {
    const { firstName, lastName, emailAddress, password } = await req.json();

    const salt = bcrypt.genSaltSync();
    const hashedPw = bcrypt.hashSync(password, salt);

    const query = `
      INSERT INTO users (
        first_name,
        last_name,
        email_address,
        password
      )
      VALUES
      (
        '${firstName}',
        '${lastName}',
        '${emailAddress}',
        '${hashedPw}'
      )
    `;

    const [results] = await connection.query(query);
    console.log("signup query results", results);

    return NextResponse.json(results);
  } catch (error) {
    console.log("signup query error", error);

    const response = {
      error,
      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 })
  }
}
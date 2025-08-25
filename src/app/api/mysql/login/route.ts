import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2/promise";
import * as bcrypt from "bcrypt";
import { createSession } from "../session";
import { getConnection } from "../lib/mysql";
import { cookies } from "next/headers";

export async function POST(req: Request, res: NextResponse) {
  const connection = await getConnection();

  try {
    const { emailAddress, password } = await req.json();

    const query = `
      SELECT
        id,
        password
      FROM users
      WHERE email_address = '${emailAddress}'
      LIMIT 1
    `;

    const [results] = await connection.execute<RowDataPacket[]>(query);
    console.log("login user query result", results);

    if (results.length === 1) {
      const { id, password: hashedPassword } = results[0];
      const passwordMatch = await bcrypt.compare(password, hashedPassword);
      if (passwordMatch) {
        const { sessionId } = await createSession(id);

        const cookieStore = await cookies();

        cookieStore.set({
          name: "job_search_session_id",
          value: sessionId,
          secure: true,
          httpOnly: true,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("login error", error);

    const response = {
      error,
      returnedStatus: 200,
    };

    return NextResponse.json(response, { status: 200 })
  }
}
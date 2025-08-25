import { randomUUID } from "crypto";
import { getConnection } from "./lib/mysql";

export async function createSession(userId: number) {
  try {
    const connection = await getConnection();

    const now = new Date();
    const expiresAt = new Date(now.setDate(now.getMinutes() + 15)).toLocaleDateString();
    console.log("expires at", expiresAt);

    const sessionId = randomUUID();

    const query = `
      INSERT INTO sessions
      (
        user_id,
        session_id,
        expires_at
      )
      VALUES
      (
        '${userId}',
        '${sessionId}',
        '${expiresAt}'
      )
    `;

    const [results] = await connection.execute(query);
    console.log("session query result", results)
  } catch (error) {
    console.log('createSession error', error);
  }
};
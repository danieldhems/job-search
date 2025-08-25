import { randomUUID, type UUID } from "crypto";
import { getConnection } from "./lib/mysql";
import { ResultSetHeader } from "mysql2";

export async function createSession(userId: number) {
  const connection = await getConnection();

  const now = new Date();
  const expiryDate = new Date(now.setDate(now.getMinutes() + 15));

  const year = expiryDate.getUTCFullYear();
  const month = expiryDate.getUTCMonth();
  const day = expiryDate.getUTCDay();
  const hours = expiryDate.getUTCHours();
  const minutes = expiryDate.getUTCMinutes();
  const seconds = expiryDate.getUTCSeconds();

  const expiresAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

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

  const [results] = await connection.execute<ResultSetHeader>(query);
  console.log("createSession result", results);

  return { sessionId };
};
import { getConnection } from "@/app/api/mysql/lib/mysql";
import { ResultSetHeader } from "mysql2";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        authorize: async function (credentials) {
          try {
            const { email, password } = credentials;
            const conn = await getConnection();

            const user = await conn.query<ResultSetHeader>(`SELECT user, email from users where email = ${email}`);
            console.log("user found", user);
          } catch (error) {
            console.log("authorize error", error)
          }
        }
      }
    })
  ],
});
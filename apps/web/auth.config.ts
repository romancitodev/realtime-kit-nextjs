import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { Login } from "@/actions/types";
import { getUsernameByEmail } from "./drizzle/queries";
import c from "bcryptjs";

export default {
	providers: [
		Credentials({
			authorize: async (data) => {
				const credentials = Login.safeParse(data);
				if (!credentials.success) return null;

				const { email, password } = credentials.data;
				const [user] = await getUsernameByEmail(email);
				if (!user || !user.password) return null;

				const match = await c.compare(password, user.password);
				return match ? user : null;
			},
		}),
	],
	callbacks: {
		session: async ({ token, session }) => {
			if (token.sub && session.user) session.user.id = token.sub;
			return session;
		},
	},
	session: { strategy: "jwt" },
	trustHost: true,
} satisfies NextAuthConfig;

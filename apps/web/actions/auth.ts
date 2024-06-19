"use server";

import { db, f, schema } from "@/drizzle";
import { Login, Register } from "./types";
import c from "bcryptjs";
import { signIn } from "@/auth";
import { routes } from "@/utils/route";
import { AuthError } from "next-auth";

export async function register(rawData: unknown) {
	const form = Register.safeParse(rawData);
	if (!form.success) return { status: 500 };
	const { data } = form;

	const [user] = await db
		.select({
			email: schema.users.email,
			name: schema.users.name,
		})
		.from(schema.users)
		.where(
			f.or(
				f.eq(schema.users.email, data.email),
				f.eq(schema.users.name, data.user),
			),
		)
		.limit(1);

	if (user) return { status: 400 };

	const password = await c.hash(data.password, 10);

	try {
		const newUser = await db
			.insert(schema.users)
			.values({
				email: data.email,
				name: data.user,
				password,
			})
			.returning({ id: schema.users.id });

		return { status: 200, data: newUser[0]?.id };
	} catch (err) {
		return { status: 500, error: err };
	}
}

export async function login(rawData: unknown) {
	const form = Login.safeParse(rawData);
	if (!form.success) return { status: 500 };
	const { email, password } = form.data;

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: routes.redirect,
		});
		return { status: 200 };
	} catch (error) {
		if (error instanceof AuthError) {
			console.log(error.message);
			switch (error.type) {
				case "CredentialsSignin":
					return { status: 501, data: "Invalid Credentials" };
				default: {
					return { status: 502, data: "Uknown error..." };
				}
			}
		}
		console.log(error);
		return { status: 503 };
	}
}

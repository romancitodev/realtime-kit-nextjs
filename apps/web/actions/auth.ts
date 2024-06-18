"use server";

import { db, f, schema } from "@/drizzle";
import { Register, type RegisterSchema } from "./types";

export async function register(rawData: RegisterSchema) {
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

	const newUser = await db
		.insert(schema.users)
		.values({
			email: data.email,
			name: data.user,
			password: data.password,
		})
		.returning({ id: schema.users.id });

	return { status: 200, data: newUser[0]?.id };
}

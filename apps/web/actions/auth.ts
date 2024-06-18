"use server";

import { db, f } from "@repo/db";
import { users } from "@repo/db/schemas";
import { Register, type RegisterSchema } from "./types";

export async function register(rawData: RegisterSchema) {
	const form = Register.safeParse(rawData);
	if (!form.success) return { status: 500 };
	const { data } = form;

	const [user] = await db
		.select({
			email: users.email,
			name: users.name,
		})
		.from(users)
		.where(f.and(f.eq(users.email, data.email), f.eq(users.name, data.user)))
		.limit(1);

	if (user) return { status: 400 };

	const newUser = await db
		.insert(users)
		.values({
			email: data.email,
			name: data.user,
			password: data.password,
		})
		.returning({ id: users.id });

	return { status: 200, data: newUser[0]?.id };
}

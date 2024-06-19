import { db, f, schema } from ".";

export const getUsernameByEmail = async (email: string) => {
	return await db
		.select({
			email: schema.users.email,
			password: schema.users.password,
		})
		.from(schema.users)
		.where(f.eq(schema.users.email, email))
		.limit(1);
};

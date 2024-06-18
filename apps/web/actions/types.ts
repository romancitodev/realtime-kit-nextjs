import { z } from "zod";

export type Response<T> = {
	status: number;
	data?: T;
};

export const Register = z.object({
	user: z.string(),
	email: z.string().email(),
	password: z
		.string()
		.refine((pwd) =>
			pwd.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			),
		),
});

export type RegisterSchema = z.infer<typeof Register>;

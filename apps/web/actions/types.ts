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
		.refine(
			(pwd) =>
				pwd.match(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				),
			"Insecure password.",
		),
});

export type RegisterSchema = z.infer<typeof Register>;

export const Login = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type LoginSchema = z.infer<typeof Login>;

export const Message = z.object({
	content: z.string().min(1),
	id: z.number().positive().optional(),
});

export type MessageSchema = z.infer<typeof Message>;

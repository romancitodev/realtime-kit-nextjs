"use server";
import { Message, type MessageSchema } from "@/actions/types";

export const send = async (data: MessageSchema) => {
	const form = Message.safeParse(data);
	if (!form.success) return;
	const { content } = form.data;
	return { content, id: Date.now() };
};

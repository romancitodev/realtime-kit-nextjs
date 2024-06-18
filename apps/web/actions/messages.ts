"use server";
import type { Socket } from "@/utils/socket";

export const send = async (data: FormData, socket: Socket) => {
	const message = data.get("message") as string;
	socket.emit("send:all:message", message);
	return { content: message, id: Date.now() };
};

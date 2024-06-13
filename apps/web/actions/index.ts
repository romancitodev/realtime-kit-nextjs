import type { Socket } from "@/utils/socket";

const sendMessage = async (data: FormData, socket: Socket) => {
	const message = data.get("message") as string;
	socket.emit("send:all:message", message);
	return { content: message, id: Date.now() };
};
export const actions = {
	messages: {
		send: sendMessage,
	},
};

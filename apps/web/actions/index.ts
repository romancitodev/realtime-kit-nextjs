import type { Socket } from "@/app/socket";

const sendMessage = async (data: FormData, socket: Socket) => {
	const message = data.get("message") as string;
	socket.emit("send:all:message", message);
};
export const actions = {
	messages: {
		send: sendMessage,
	},
};

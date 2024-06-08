import type { Socket } from "@/app/socket";
import e from "./events";

export const configure = (socket: Socket) => {
	socket.on("new:message", e.newMessage);
	socket.on("new:client", e.newClient);
	socket.on("off:client", e.goodbyeUser);
};

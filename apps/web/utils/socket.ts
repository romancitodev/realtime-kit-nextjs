import type { Socket } from "socket.io-client";
import e from "./events";

export const configure = (socket: Socket) => {
	socket.on("new-message", e.newMessage);
	socket.on("cast:disconnect", e.goodbyeUser);
};

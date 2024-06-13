import { type Socket as SocketIO, io } from "socket.io-client";
import type { Events, Responses } from "@repo/types/socket";
import e from "./events";

export type Socket = SocketIO<Responses, Events>;

export const connect = () =>
	new Promise<Socket>((resolve, eject) => {
		const socket: Socket = io("http://localhost:4000", {
			transports: ["websocket"],
			autoConnect: false,
		});
		socket.connect();
		socket.on("connect", () => {
			configure(socket);
			return resolve(socket);
		});
		socket.on("connect_error", eject);
	});

export const configure = (socket: Socket) => {
	socket.on("new:client", e.newClient);
	socket.on("off:client", e.goodbyeUser);
};

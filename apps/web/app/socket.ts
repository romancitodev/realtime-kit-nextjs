import { type Socket as SocketIO, io } from "socket.io-client";
import type { Events, Responses } from "@repo/types/socket";

export type Socket = SocketIO<Responses, Events>;

export const socket: Socket = io("http://localhost:4000", {
	transports: ["websocket"],
});

import { createServer } from "node:http";
import { Server as ServerIO, type Socket as SocketIO } from "socket.io";
import type { Responses, Events } from "@repo/types/socket";
import * as e from "./ws-events";

const hostname = "localhost";
const port = 4000;

export type Socket = SocketIO<Events, Responses>;
export type Server = ServerIO<Events, Responses>;

const http = createServer();
export const io: Server = new ServerIO(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", e.connect);

http
	.once("error", e.error)
	.listen(port, e.args({ hostname, port }, e.serverUp));

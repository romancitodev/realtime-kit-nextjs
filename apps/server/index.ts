import { createServer } from "node:http";
import { Server } from "socket.io";
import * as e from "./ws-events";

const hostname = "localhost";
const port = 4000;

const http = createServer();
const io = new Server(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", e.connect);

http
	.once("error", e.error)
	.listen(port, e.args({ hostname, port }, e.serverUp));

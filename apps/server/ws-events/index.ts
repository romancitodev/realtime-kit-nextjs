import type { Socket } from "..";
export const connect = (socket: Socket) => {
	console.log(`✅ client [${socket.id}] connected.`);
	socket.broadcast.emit("new:client", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("off:client", socket.id);
		console.log(`❌ client [${socket.id}] disconnected...`);
	});

	socket.on("send:message", (msg: string) => {
		socket.emit("log:message", msg, Date.now());
	});

	// socket events;
	socket.on("send:all:message", (msg: string) => {
		console.log("📡 Broadcasting message...");
		socket.broadcast.emit("new:message", msg, Date.now());
	});

	socket.on("send:all:notice", (msg: string) => {
		socket.broadcast.emit("new:notice", msg);
	});

	socket.on("send:all:connect", () => {
		socket.broadcast.emit("new:client", socket.id);
	});
};

export const error = (err: Error) => {
	console.error(err);
	process.exit(1);
};

export function serverUp(this: { port: number | string; hostname: string }) {
	console.log(`> 🏁 Server started on: ${this.hostname}:${this.port}`);
}

export const args = <
	A extends ThisParameterType<F>,
	// biome-ignore lint/suspicious/noExplicitAny: It's better for unknown types IDK;
	F extends (...args: any[]) => void,
>(
	args: A,
	fn: F,
) => {
	return fn.bind(args);
};

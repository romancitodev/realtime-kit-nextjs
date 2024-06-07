import type { Socket } from "socket.io";

export const connect = (socket: Socket) => {
	console.log(`✅ New client connected: ${socket.id}`);

	socket.on("disconnect", () => {
		socket.broadcast.emit("cast:disconnect", socket.id);
		console.log("❌ A client disconnected...");
	});

	// socket events;
	socket.on("message", (msg) => {
		socket.emit("new-message", msg);
	});

	socket.on("broadcast-msg", (msg) => {
		console.log("📡 Emitting signal...");
		socket.broadcast.emit("new-message", msg);
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

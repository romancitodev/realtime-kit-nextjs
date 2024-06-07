import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", { transports: ["websocket"] });

export function useSocket() {
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		socket.on("new-message", (msg: string) =>
			console.log(`🚀 The socket says: ${msg}`),
		);
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		if (socket.connected) onConnect();

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	return { isConnected, socket };
}

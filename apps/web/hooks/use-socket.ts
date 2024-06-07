import { useState, useEffect, useRef } from "react";
import { type Socket, io } from "socket.io-client";

export function useSocket() {
	const socketRef = useRef<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [ready, setReady] = useState(false);

	const getSocket = () => {
		if (typeof window === "undefined") {
			return null;
		}

		if (socketRef.current !== null) {
			return socketRef.current;
		}

		const socket = io("http://localhost:4000", {
			transports: ["websocket"],
			autoConnect: false,
		});
		socketRef.current = socket;
		socket.connect();
		return socket;
	};

	const socket = getSocket();

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		if (typeof window !== "undefined" && socket) {
			if (socket.connected) onConnect();
			setReady(true);
			socket.on("connect", onConnect);
			socket.on("disconnect", onDisconnect);
		}

		return () => {
			socket?.off("connect", onConnect);
			socket?.off("disconnect", onDisconnect);
		};
	}, [socket]);

	return { ready, isConnected, socket };
}

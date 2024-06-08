"use client";

import type { Socket } from "@/app/socket";
import { useIsClient } from "@/hooks/use-client";
import { configure } from "@/utils/socket";
import type React from "react";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

type Context = {
	socket: Socket;
	ready: boolean;
};

const socket: Socket = io("http://localhost:4000", {
	transports: ["websocket"],
	autoConnect: false,
});

const SocketContext = createContext<Context>({
	socket,
	ready: false,
});

export const useSocket = () => {
	const ctx = useContext(SocketContext);
	return ctx;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const socketRef = useRef<Socket | null>(null);
	const ready = useIsClient();

	const getSocket = () => {
		if (socketRef.current) return socketRef.current;
		socketRef.current = socket;
		return socket;
	};

	const _socket = getSocket();

	useEffect(() => {
		configure(socket);
		if (ready) socket.connect();
		return () => {
			void socket.removeAllListeners();
			void socket.close();
		};
	}, [ready]);

	return (
		<SocketContext.Provider value={{ ready, socket: _socket }}>
			{children}
		</SocketContext.Provider>
	);
};

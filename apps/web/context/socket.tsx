"use client";

import type { Socket } from "@/utils/socket";
import { connect } from "@/utils/socket";
import type React from "react";
import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

type Context = {
	socket: Socket | null;
	ready: boolean;
};

export const SocketContext = createContext<Context>({
	socket: null,
	ready: false,
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, loadSocket] = useState<Socket | null>(null);
	const loading = useRef(false);
	const [ready, setReady] = useState(false);

	const load = useCallback(() => {
		connect().then((s) => {
			loadSocket(s);
			setReady(true);
		});
	}, []);

	// Initialize the socket
	useEffect(() => {
		if (!socket && !loading.current) {
			loading.current = true;
			load();
		}
	}, [socket, load]);

	// In case the socket disconnects, just drop it.
	useEffect(() => {
		if (!socket) return;

		const unload = () => loadSocket(null);

		socket.on("disconnect", unload);

		return () => {
			socket.disconnect();
			socket.off("disconnect", unload);
		};
	}, [socket]);

	return (
		<SocketContext.Provider
			value={useMemo(() => ({ ready, socket }), [socket, ready])}
		>
			{children}
		</SocketContext.Provider>
	);
};

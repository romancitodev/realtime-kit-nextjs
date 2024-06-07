"use client";

import { useSocket } from "@/hooks/use-socket";
import { configure } from "@/utils/socket";
import { useEffect } from "react";

export function Socket() {
	const { socket, ready } = useSocket();

	useEffect(() => {
		if (ready && socket) {
			configure(socket);
			socket.emit("broadcast-msg", "Socket hi");
		}
	}, [socket, ready]);

	if (!ready || !socket) return <main>lo</main>;

	return <main>hello {socket.id}</main>;
}

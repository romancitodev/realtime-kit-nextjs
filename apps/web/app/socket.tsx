"use client";

import dynamic from "next/dynamic";
import { useSocket } from "@/hooks/socket";
import { useEffect } from "react";
import React from "react";

export function _Socket() {
	const { socket } = useSocket();

	useEffect(() => {
		if (socket.disconnected) socket.connect();
		socket.emit("broadcast-msg", "Socket hi");
		return () => void socket.disconnect();
	}, [socket]);

	return <main>Helo</main>;
}

export const Socket = dynamic(
	import("./socket").then((m) => m._Socket),
	{
		ssr: false,
		loading: () => <main>Loading...</main>,
	},
);

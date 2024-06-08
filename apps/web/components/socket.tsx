"use client";

import { useIsClient } from "@/hooks/use-client";
import { useSocket } from "@/hooks/use-socket";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type Message = {
	message: string;
	id: number;
};

export function _Socket() {
	const ready = useIsClient();
	const { socket } = useSocket();
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		if (ready) {
			socket.on("new:message", (msg, id) =>
				setMessages((msgs) => [
					...msgs,
					{
						message: msg,
						id,
					},
				]),
			);
			if (socket.id) {
				socket.emit("send:message", "testing local messages");
				socket.emit("send:all:connect", socket.id);
			}
		}
	}, [socket, ready]);

	return (
		<main>
			hello {socket.id}
			Messages:
			<li>
				{messages.map(({ message, id }) => (
					<ul key={id}>{message}</ul>
				))}
			</li>
		</main>
	);
}

export const Socket = dynamic(
	() => import("@/components/socket").then((m) => m._Socket),
	{
		ssr: false,
		loading: () => <main>hello A Messages: None</main>,
	},
);

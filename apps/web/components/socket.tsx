"use client";

import { oneShot } from "@/hooks/on-client";
import { useSocket } from "@/hooks/use-socket";
import { useState } from "react";

type Message = {
	message: string;
	id: number;
};

export function Socket() {
	const { ready, socket } = useSocket();
	const [messages, setMessages] = useState<Message[]>([]);

	oneShot(() => {
		if (!socket) return;

		socket.on("new:message", (msg, id) =>
			setMessages((msgs) => [...msgs, { message: msg, id }]),
		);
		socket.on("log:message", (msg, id) => {
			console.log(`Message from my own: ${msg} [${id}]`);
		});
		socket.emit("send:message", "testing local messages");
	}, ready);

	return !ready || !socket ? (
		<main>Disconnected</main>
	) : (
		<main>
			hello {socket.id}
			<br />
			Messages:
			<li>
				{messages.map(({ message, id }) => (
					<ul key={id}>{message}</ul>
				))}
			</li>
		</main>
	);
}

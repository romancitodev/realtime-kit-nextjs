"use client";

import { useSocket } from "@/hooks/use-socket";
import { store } from "@/store/messages";

export function Socket() {
	const { ready, socket } = useSocket();
	const messages = store.chats((s) => s.messages);

	if (!socket) return <main>Disconnected</main>;

	if (!ready) return <main>Loading client...</main>;

	return (
		<main className="">
			hello {socket.id}
			<br />
			Messages:
			<li>
				{messages.map(({ content, id }) => (
					<ul key={id}>{content}</ul>
				))}
			</li>
		</main>
	);
}

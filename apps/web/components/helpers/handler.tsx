"use client";

import { oneShot } from "@/hooks/on-client";
import { useSocket } from "@/hooks/use-socket";
import { store } from "@/store/messages";

export function Handler() {
	const { ready, socket } = useSocket();
	const addMessage = store.chats((s) => s.addMessage);
	const updateNotice = store.notices((s) => s.updateNotice);
	oneShot(() => {
		if (!socket) return;
		socket.on("new:message", (content, id) => {
			addMessage({ content, id });
		});
		socket.on("log:message", (msg, id) => {
			console.log(`Message from my own: ${msg} [${id}]`);
		});
		socket.on("new:notice", (notice) => {
			updateNotice(notice);
		});
		socket.emit("send:message", "testing local messages");
	}, ready);
	return null;
}

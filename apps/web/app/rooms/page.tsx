"use client";

import { actions } from "@/actions";
import { useSocket } from "@/hooks/use-socket";
import { store } from "@/store/messages";
import { Form } from "@repo/ui/form";
import { Button, Input } from "@repo/ui/primitives";
import { type FormEvent, useRef } from "react";

export default function Page() {
	const { ready, socket } = useSocket();
	const { messages, addMessage } = store.chats();
	const formRef = useRef<HTMLFormElement>(null);

	if (!ready || !socket) return <main>loading...</main>;

	const handleInput = (e: FormEvent<HTMLInputElement>) => {
		const notice = e.currentTarget.value;
		console.log("updating notice");
		socket.emit("send:all:notice", notice);
	};

	return (
		<main className="max-w-96">
			Hello chat
			<form
				ref={formRef}
				action={(data) => {
					actions.messages.send(data, socket).then((msg) => addMessage(msg));
					if (formRef.current) formRef.current.reset();
					socket.emit("send:all:notice", "");
				}}
			>
				<Input
					name="message"
					onInput={handleInput}
				/>
				<Button>Click me!</Button>
				<li>
					{messages.map(({ content, id }) => (
						<ul key={id}>{content}</ul>
					))}
				</li>
			</form>
			<Form />
		</main>
	);
}

"use client";

import { actions } from "@/actions";
import { useSocket } from "@/hooks/use-socket";
import { store } from "@/store/messages";
import { Input } from "@repo/atoms/input";
import { Button } from "@repo/atoms/button";
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
		<article className="w-full h-full flex flex-col gap-y-5 items-center justify-center">
			<h1 className="text-foreground dark:text-foreground">Projectfy</h1>
			<div className="w-96 flex flex-col gap-6 items-start">
				<form
					className="w-full h-full flex items-start gap-x-5"
					ref={formRef}
					action={(data) => {
						actions.messages.send(data, socket).then((msg) => addMessage(msg));
						if (formRef.current) formRef.current.reset();
						socket.emit("send:all:notice", "");
					}}
				>
					<Input name="message" onInput={handleInput} />
					<Button className="h-full">Click me!</Button>
				</form>
				<section className="h-48 overflow-y-auto border-[1px] border-gray-300 bg-gray-50 dark:border-gray-300/25 dark:bg-neutral-950 dark:text-gray-100 rounded-md p-2 w-full">
					<li className="list-none w-full">
						{messages.map(({ content, id }) => (
							<ul key={id}>{content}</ul>
						))}
					</li>
				</section>
			</div>
		</article>
	);
}

"use client";

import { useSocket } from "@/hooks/use-socket";
import { store } from "@/store/messages";
import type { FormEvent } from "react";
import { Form } from "@/components/chat/form";

export default function Page() {
	const { ready, socket } = useSocket();
	const messages = store.chats((c) => c.messages);
	const notices = store.notices((n) => n.notice);

	if (!ready || !socket) return <main>loading...</main>;

	const handleInput = (e: FormEvent<HTMLInputElement>) => {
		const notice = e.currentTarget.value;
		socket.emit("send:all:notice", notice);
	};

	return (
		<article className="w-full h-full flex flex-col gap-y-5 items-center justify-center">
			<h1 className="text-foreground dark:text-foreground">Projectfy</h1>
			<div className="w-96 grid grid-cols-1 grid-rows-1 gap-6 items-start">
				<Form onInput={handleInput} />
				<section className="h-48 overflow-y-auto border-[1px] border-gray-300 bg-gray-50 dark:border-gray-300/25 dark:bg-neutral-950 dark:text-gray-100 rounded-md p-2 w-full">
					<li className="list-none w-full">
						{messages.map(({ content, id }) => (
							<ul key={id}>{content}</ul>
						))}
						{notices && <ul>Someone is writing...</ul>}
					</li>
				</section>
			</div>
		</article>
	);
}

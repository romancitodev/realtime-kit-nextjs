"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@repo/atoms/button";
import {
	FormControl,
	FormField,
	FormItem,
	Form as _Form,
} from "@repo/atoms/form";

import { send } from "@/actions/messages";
import { Message, type MessageSchema } from "@/actions/types";
import { Input } from "@repo/atoms/input";
import { type FormEvent, useTransition } from "react";
import { useSocket } from "@/hooks/use-socket";
import { store } from "@/store/messages";

type FormProps = {
	onInput: (e: FormEvent<HTMLInputElement>) => void;
};

export function Form({ onInput }: FormProps) {
	const { socket } = useSocket();
	const addMessage = store.chats((s) => s.addMessage);
	// 1. Define your form.
	const form = useForm<MessageSchema>({
		resolver: zodResolver(Message),
		defaultValues: {
			content: "",
		},
	});
	const [pending, startTransition] = useTransition();

	if (!socket) return <section>Loading form...</section>;

	// 2. Define a submit handler.
	function onSubmit(data: MessageSchema) {
		startTransition(() => {
			if (!socket) return;
			send(data)
				.then((d) => {
					if (!d) return;
					socket?.emit("send:all:message", d.content);
					addMessage(d);
					form.resetField("content");
					socket.emit("send:all:notice", "");
				})
				.catch(console.error);
		});
	}

	return (
		<_Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit, console.error)}
				className="w-full flex m-auto items-center justify-between gap-6 h-full"
			>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									className="w-full h-full"
									onInput={onInput}
									type="text"
									placeholder="Hello, world!"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={pending} variant="outline">
					Send message
				</Button>
			</form>
		</_Form>
	);
}

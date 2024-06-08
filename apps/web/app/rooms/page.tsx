"use client";

import { actions } from "@/actions";
import { useSocket } from "@/hooks/use-socket";
import { Input } from "@repo/ui/input";

export default function Page() {
	const { ready, socket } = useSocket();

	if (!ready) return <main>loading...</main>;

	return (
		<main>
			Hello chat
			<form action={(data) => actions.messages.send(data, socket)}>
				<Input name="message" />
			</form>
		</main>
	);
}

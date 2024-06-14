"use client";

import { store } from "@/store/messages";

export function Notice() {
	const notice = store.notices((s) => s.notice);
	return <div>{!notice ? "All is chill" : "Someone is typing..."}</div>;
}

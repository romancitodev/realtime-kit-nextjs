import { create } from "zustand";

type Message = {
	id: number;
	content: string;
};

interface Chats {
	messages: Message[];
	addMessage: (msg: Message) => void;
}

interface Notices {
	notice: string;
	updateNotice: (notice: string) => void;
}

const chats = create<Chats>((set) => ({
	messages: [],
	addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));

const notices = create<Notices>((set) => ({
	notice: "",
	updateNotice: (notice) => set((_) => ({ notice })),
}));

export const store = {
	chats,
	notices,
};

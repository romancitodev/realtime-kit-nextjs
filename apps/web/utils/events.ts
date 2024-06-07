const newMessage = (msg: string) => {
	console.log(`✨ New message from the socket: ${msg}`);
};

const goodbyeUser = (id: string) => {
	console.log(`😭 Goodbye ${id}!`);
};

export default {
	newMessage,
	goodbyeUser,
};

const newClient = (id: string) => {
	console.log(`🆕 New Client ${id}`);
};

const goodbyeUser = (id: string) => {
	console.log(`😭 Goodbye ${id}!`);
};

export default {
	goodbyeUser,
	newClient,
};

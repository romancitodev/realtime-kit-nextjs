export const routes = {
	public: ["/"],
	protected: ["/rooms"],
	auth: {
		prefix: "/api/auth",
		login: "/login",
		register: "/register",
	},
	redirect: "/rooms",
};

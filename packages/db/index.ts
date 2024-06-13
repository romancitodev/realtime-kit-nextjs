import { createClient } from "edgedb";
export { default as e } from "./dbschema/edgeql-js";
import createAuth from "@edgedb/auth-nextjs/app";

const token: string = "";

export const client = createClient({
	instanceName: "repo-db",
	tlsSecurity: "insecure",
}).withGlobals({
	"ext::auth::client_token": token,
});

export const auth = createAuth(client, {
	baseUrl: "http://localhost:3000",
	passwordResetPath: "/reset-password",
});

import { createClient } from "edgedb";
export { default as e } from "./dbschema/edgeql-js";
import createAuth from "@edgedb/auth-nextjs/app";

export const client = createClient({
	instanceName: "repo-db",
	tlsSecurity: "insecure",
}).withGlobals({
	"ext::auth::AuthConfig::auth_signing_key": process.env.auth_signin_key,
});

export const auth = createAuth(client, {
	baseUrl: "http://localhost:3000",
	passwordResetPath: "/reset-password",
});

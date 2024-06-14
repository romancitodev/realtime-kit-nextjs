import { redirect } from "next/navigation";
import { auth } from "@repo/db";
import { e } from "@repo/db";

export const { GET, POST } = auth.createAuthRouteHandlers({
	async onBuiltinUICallback({ error, tokenData, isSignUp }) {
		if (error) {
			console.error("[EdgeDB]: ", error);
		}

		if (!tokenData) {
			console.warn("Token data required");
		}

		if (isSignUp && tokenData) {
			e.insert(e.User, {
				name: "",
				identity: e.assert_exists(
					e.select(e.ext.auth.Identity, (_) => ({
						filter_single: { id: tokenData.identity_id },
					})),
				),
			});
			redirect("/onboarding");
		}
		redirect("/");
	},
	onSignout() {
		redirect("/");
	},
});

import { redirect } from "next/navigation";
import { auth } from "@repo/db";
import { e } from "@repo/db";

export const { GET, POST } = auth.createAuthRouteHandlers({
	async onBuiltinUICallback({ tokenData, isSignUp }) {
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

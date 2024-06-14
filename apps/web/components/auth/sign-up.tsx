import Link from "next/link";
import { Button } from "@repo/atoms/button";
import { auth } from "@repo/db";

export function SignUp() {
	return (
		<Link href={auth.getBuiltinUIUrl()} prefetch={false}>
			<Button className="bg-primary px-4 py-2 rounded-md dark:bg-red-500">
				Sign up
			</Button>
		</Link>
	);
}

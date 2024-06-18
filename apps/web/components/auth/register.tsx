import Link from "next/link";
import { Button } from "@repo/atoms/button";

export function Register() {
	return (
		<Link href="/sign-up">
			<Button className="bg-primary px-4 py-2 rounded-md dark:bg-white">
				Sign up
			</Button>
		</Link>
	);
}

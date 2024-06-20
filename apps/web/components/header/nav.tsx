import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "@repo/atoms/button";
import { ChangeTheme } from "@/components/theme/theme";

export async function Nav() {
	const session = await auth();

	const handleSubmit = async () => {
		"use server";
		await signOut();
	};

	return (
		<header className="flex w-full justify-between dark:text-white">
			<h2 className="w-full text-2xl items-center">Acme.com</h2>
			<nav className="flex w-max gap-2">
				{session?.user ? (
					<form action={handleSubmit}>
						<Button type="submit">Sign out</Button>
					</form>
				) : (
					<>
						<Link href="/login">
							<Button>Login</Button>
						</Link>
						<Link href="/register">
							<Button variant="outline">Register</Button>
						</Link>
					</>
				)}
				<ChangeTheme />
			</nav>
		</header>
	);
}

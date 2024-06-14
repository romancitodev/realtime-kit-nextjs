import { Notice } from "@/components/chat/notice";
import { SignUp } from "@/components/auth/sign-up";
import { Socket } from "@/components/chat/socket";

export default function Page(): JSX.Element {
	return (
		<main>
			<Notice />
			<SignUp />
			<Socket />
		</main>
	);
}

import { Notice } from "@/components/notice";
import { Socket } from "@/components/socket";

export default function Page(): JSX.Element {
	return (
		<main>
			<Notice />
			<Socket />
		</main>
	);
}

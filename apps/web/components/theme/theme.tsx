"use client";

import { useTheme } from "next-themes";
import { Button } from "@repo/atoms/button";
import { useState } from "react";
import { oneShot } from "@/hooks/on-client";
import { SunMedium, Moon } from "lucide-react";

export const ChangeTheme = () => {
	const { theme, setTheme } = useTheme();
	const [ready, setReady] = useState(false);

	oneShot(() => setReady(true), typeof window !== "undefined");

	if (!ready) return <Button>Loading</Button>;

	const handleClick = ($theme: string) => setTheme($theme);
	const newTheme = theme === "dark" ? "light" : "dark";

	return (
		<Button size="icon" onClick={() => handleClick(newTheme)}>
			{theme === "light" ? <Moon /> : <SunMedium />}
		</Button>
	);
};

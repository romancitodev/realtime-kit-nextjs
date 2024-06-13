import type { Config } from "tailwindcss";
import primitives from "@repo/primitives/tailwind.config.ts";

const config = {
	content: ["./src/**/*.tsx"],
	presets: [primitives],
} satisfies Config;

export default config;

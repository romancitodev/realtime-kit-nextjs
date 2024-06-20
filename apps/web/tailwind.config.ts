// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import ui from "@repo/atoms/tailwind.config.ts";

const config: Pick<Config, "content" | "presets" | "darkMode"> = {
	darkMode: "class",
	content: ["./app/**/*.tsx", "./components/**/*.tsx"],
	presets: [ui],
};

export default config;

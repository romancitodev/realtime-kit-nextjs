// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import ui from "@repo/ui/tailwind.config.ts";

const config: Pick<Config, "content" | "presets"> = {
	content: ["./app/**/*.tsx"],
	presets: [ui],
};

export default config;

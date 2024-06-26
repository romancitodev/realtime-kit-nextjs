import * as React from "react";

import { cn } from "../utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex max-h-10 w-full rounded-md border border-input transition-colors dark:border-input/30 bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-neutral-950 focus-visible:border-px focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:text-white",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };

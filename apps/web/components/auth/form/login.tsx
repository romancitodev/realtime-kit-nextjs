"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@repo/atoms/button";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form as _Form,
} from "@repo/atoms/form";

import { login } from "@/actions/auth";
import { Login, type LoginSchema } from "@/actions/types";
import { Input } from "@repo/atoms/input";
import { useState, useTransition } from "react";

export function Form() {
	// 1. Define your form.
	const form = useForm<LoginSchema>({
		resolver: zodResolver(Login),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const [status, setStatus] = useState<string>();
	const [pending, startTransition] = useTransition();

	// 2. Define a submit handler.
	function onSubmit(data: LoginSchema) {
		startTransition(() => {
			login(data).then((res) => setStatus(res?.data || "Unknown"));
		});
	}

	return (
		<_Form {...form}>
			<form
				className="space-y-6 w-full flex flex-col"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="dark:text-gray-50">Name</FormLabel>
							<FormControl>
								<Input
									type="email"
									autoComplete="email"
									placeholder="jhon@doe.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="dark:text-gray-50">Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									autoComplete="current-password"
									placeholder="********"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={pending} onClick={form.handleSubmit(onSubmit)}>
					Submit
				</Button>
				{status && <pre className="dark:text-white">{status}</pre>}
			</form>
		</_Form>
	);
}

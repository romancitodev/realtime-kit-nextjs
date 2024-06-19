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
	const [status, setStatus] = useState<number>();
	const [pending, startTransition] = useTransition();

	// 2. Define a submit handler.
	function onSubmit(data: LoginSchema) {
		startTransition(() => {
			login(data)
				.then((res) => setStatus(res?.status || 600))
				.catch(console.error);
		});
	}

	return (
		<_Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-full grid gap-y-5"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
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
							<FormLabel>Password</FormLabel>
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
				<Button type="submit" disabled={pending}>
					Submit
				</Button>
				{status && <pre>{status}</pre>}
			</form>
		</_Form>
	);
}

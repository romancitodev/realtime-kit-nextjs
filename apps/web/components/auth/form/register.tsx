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

import { register } from "@/actions/auth";
import { Register, type RegisterSchema } from "@/actions/types";
import { Input } from "@repo/atoms/input";
import { useState, useTransition } from "react";

export function Form() {
	// 1. Define your form.
	const form = useForm<RegisterSchema>({
		resolver: zodResolver(Register),
		defaultValues: {
			user: "",
			email: "",
			password: "",
		},
	});
	const [status, setStatus] = useState<number>();
	const [pending, startTransition] = useTransition();

	// 2. Define a submit handler.
	function onSubmit(data: RegisterSchema) {
		startTransition(() => {
			register(data).then((res) => setStatus(res.status));
		});
	}

	return (
		<_Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="user"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									autoComplete="username"
									placeholder="Jhon doe"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is your public display name.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
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
							<FormDescription>
								This is your private email contact.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									type="password"
									autoComplete="current-password"
									placeholder="********"
									{...field}
								/>
							</FormControl>
							<FormDescription>This is your private password.</FormDescription>
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

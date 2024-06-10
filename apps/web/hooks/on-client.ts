import { useEffect } from "react";

export const onClient = (
	callback: () => void,
	cond: boolean,
	deps: unknown[],
) => {
	return useEffect(() => {
		if (cond) callback();
	}, [cond, callback, ...deps]);
};

export const oneShot = (callback: () => void, cond: boolean) => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: This is a one-shot hook.
	return useEffect(() => {
		if (cond) callback();
	}, [cond]);
};

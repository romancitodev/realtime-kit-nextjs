import type React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
	return <input {...props} type="search" />;
};

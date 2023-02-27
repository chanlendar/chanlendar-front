import { ChangeEvent, useState } from "react";

export default function (initialValue: string = "") {
	const [input, setInput] = useState(initialValue);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	};

	return [input, setInput, onChange] as const;
}

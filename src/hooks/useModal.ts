import { useState } from "react";

export default function (initialValue: boolean = false, onModalClose: VoidFunction) {
	const [isOpen, setOpen] = useState(initialValue);

	const onClose = () => {
		setOpen(false);
		onModalClose();
	};

	return [isOpen, setOpen, onClose] as const;
}

import { MouseEvent, useState } from "react";

const initialContextMenu = {
	show: false,
	x: 0,
	y: 0,
};

export default function () {
	const [contextMenu, setContextMenu] = useState(initialContextMenu);

	const onContextMenu =
		(id: string, callback: (id: string) => void) => (e: MouseEvent<HTMLDivElement>) => {
			e.preventDefault();
			const { pageX, pageY } = e;
			setContextMenu({
				show: true,
				x: pageX,
				y: pageY,
			});
			callback(id);
		};

	const closeContextMenu = () => {
		setContextMenu({
			show: false,
			x: 0,
			y: 0,
		});
	};

	return [contextMenu, setContextMenu, onContextMenu, closeContextMenu] as const;
}

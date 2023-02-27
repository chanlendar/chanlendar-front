// IMPORTANT: 컨텍스트 메뉴 show 컨트롤은 children에서 해줘야함
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { css } from "@emotion/react";
import { useRef } from "react";

interface Props {
	x: number;
	y: number;
	show: boolean;
	closeContextMenu?: VoidFunction | ((e: MouseOrTouchEvent) => void);
	closeIfOutsideClicked?: boolean;
}

const ContextMenu = ({
	children,
	x,
	y,
	show,
	closeContextMenu,
	closeIfOutsideClicked = false,
}: React.PropsWithChildren<Props>) => {
	const ref = useRef(null);

	if (closeIfOutsideClicked && closeContextMenu) useOnClickOutside(ref, closeContextMenu);

	return (
		<>
			{show && (
				<div
					ref={ref}
					css={css`
						position: absolute;
						top: ${y}px;
						left: ${x}px;
					`}
				>
					{children}
				</div>
			)}
		</>
	);
};

export default ContextMenu;

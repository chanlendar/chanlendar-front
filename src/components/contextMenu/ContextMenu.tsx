import useOnClickOutside from "@/hooks/useOnClickOutside";
import styled from "@emotion/styled";
import { useRef } from "react";

interface Props {
	x: number;
	y: number;
	show: boolean;
	closeContextMenu?: VoidFunction | ((e: MouseOrTouchEvent) => void);
	closeIfOutsideClicked?: boolean;
}

/**
 * IMPORTANT: 컨텍스트 메뉴 show 컨트롤은 children에서 해줘야함
 * closeIfOutsideClicked와 closeContextMenu는 같이 넣어줘야함
 */
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
				<Layout ref={ref} top={y} left={x}>
					<ContextMenuItemLayout>{children}</ContextMenuItemLayout>
				</Layout>
			)}
		</>
	);
};

const Layout = styled.div<{ top: number; left: number }>(({ top, left }) => ({
	position: "absolute",
	top: top + "px",
	left: left + "px",
}));

const ContextMenuItemLayout = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;

	border: 1px solid ${({ theme }) => theme.contextMenu.borderColor};

	& > div:not(:first-of-type) {
		border-top: 1px solid ${({ theme }) => theme.contextMenu.borderColor};
	}

	background-color: ${({ theme }) => theme.contextMenu.backgroundColor};
	user-select: none;
	cursor: pointer;
`;

export default ContextMenu;

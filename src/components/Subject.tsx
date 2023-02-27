import { useTheme, css } from "@emotion/react";

interface Props {
	onClick?: OnDivMouseFunction;
	onContextMenu?: OnDivMouseFunction;
	onMouseEnter?: OnDivMouseFunction;
	onMouseLeave?: OnDivMouseFunction;
}

const Subject = ({
	children,
	onClick,
	onContextMenu,
	onMouseEnter,
	onMouseLeave,
}: React.PropsWithChildren<Props>) => {
	const theme = useTheme();
	return (
		<div
			onClick={onClick}
			onContextMenu={onContextMenu}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			css={css`
				width: 48px;
				height: 48px;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: ${theme.sidebar.subject.backgroundColor};
				border-radius: 25px;
				user-select: none;
				cursor: pointer;

				@media (hover: hover) and (pointer: fine) {
					&:hover {
						color: ${theme.sidebar.subject.hoverColor};
						background-color: ${theme.sidebar.subject.hoverBackgroundColor};
					}
				}
			`}
		>
			{children}
		</div>
	);
};

export default Subject;

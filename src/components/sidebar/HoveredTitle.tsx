import { css, useTheme } from "@emotion/react";

interface Props {
	show: boolean;
}

const HoveredTitle = ({ children, show }: React.PropsWithChildren<Props>) => {
	const theme = useTheme();
	return (
		<>
			{show && (
				<div
					css={css`
						position: absolute;
						z-index: 1000;
						border-radius: 4px;
						background-color: ${theme.sidebar.hoveredTitle.backgroundColor};
						color: ${theme.sidebar.hoveredTitle.color};
						font-size: 14px;
						font-weight: bold;
						left: 64px;
						padding: 10px;
					`}
				>
					{children}
				</div>
			)}
		</>
	);
};

export default HoveredTitle;

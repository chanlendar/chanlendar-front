import { css, useTheme } from "@emotion/react";

interface Props {
	// TODO: 기능구현할 때 바꾸기
	finished?: boolean;
}

const DailyItem = ({ children, finished = false }: React.PropsWithChildren<Props>) => {
	const theme = useTheme();
	const borderColor = finished
		? theme.daily.item.finishedColor
		: theme.daily.item.borderColor;
	const color = finished ? theme.daily.item.finishedColor : theme.daily.item.color;
	const textDecoration = finished ? "line-through" : "none";
	return (
		<div
			css={css`
				padding: 10px;
				max-width: 340px;
				width: 340px;

				border: 1px solid ${borderColor};
				border-radius: 4px;

				color: ${color};
				font-size: 16px;
				text-decoration: ${textDecoration};
			`}
		>
			{children}
		</div>
	);
};

export default DailyItem;

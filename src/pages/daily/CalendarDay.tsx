import { ReactNode } from "react";
import { css, useTheme } from "@emotion/react";

interface Props {
	children: ReactNode;
	saturDay: boolean;
	sunDay: boolean;
}

const CalendarDay: React.FC<Props> = ({ children, saturDay, sunDay }) => {
	const theme = useTheme();
	const color =
		(saturDay && "#2979ff") || (sunDay && "#f44336") || theme.daily.calendar.item.text;

	return (
		<div
			css={css`
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 14px;
				color: ${color};
			`}
		>
			<div
				css={css`
					width: 20px;
					height: 20px;
					display: flex;
					justify-content: center;
					align-items: center;
				`}
			>
				{children}
			</div>
		</div>
	);
};

export default CalendarDay;

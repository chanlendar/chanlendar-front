import { ReactNode } from "react";
import { css, useTheme } from "@emotion/react";
import useStores from "@/hooks/useStore";

interface Props {
	children: ReactNode;
	saturDay: boolean;
	sunDay: boolean;
	isSelected: boolean;
	hasTask: boolean;
	date: number;
}

const CalendarDay: React.FC<Props> = ({
	children,
	saturDay,
	sunDay,
	isSelected,
	hasTask,
	date,
}) => {
	const { calendarStore } = useStores();
	const theme = useTheme();
	const color =
		(isSelected && theme.daily.calendar.item.selectedText) ||
		(hasTask && theme.daily.calendar.item.borderColor) ||
		(saturDay && "#2979ff") ||
		(sunDay && "#f44336") ||
		theme.daily.calendar.item.text;
	const backgroundColor =
		(isSelected && theme.daily.calendar.item.selectedBackground) || "transparent";
	const borderColor = (hasTask && theme.daily.calendar.item.borderColor) || "none";

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
					width: 26px;
					height: 26px;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: ${backgroundColor};
					border-radius: 2px;
					border: 1px solid ${borderColor};
					cursor: pointer;
				`}
				onClick={() => calendarStore.changeSelectedDay(date)}
			>
				{children}
			</div>
		</div>
	);
};

export default CalendarDay;

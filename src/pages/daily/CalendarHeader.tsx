import { css, useTheme } from "@emotion/react";
import { observer } from "mobx-react";

import useStores from "@/hooks/useStore";
import CalendarHeaderIcon from "@/pages/daily/CalendarHeaderIcon";
import ChevronDoubleLeft from "@/icons/ChevronDoubleLeft";
import ChevronDoubleRight from "@/icons/ChevronDoubleRight";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";

interface Props {
	onClick: VoidFunction;
}

const CalendarHeader = ({ onClick }: React.PropsWithChildren<Props>) => {
	const theme = useTheme();
	const { calendarStore } = useStores();
	return (
		<div
			css={css`
				height: 40px;
				display: flex;
			`}
			onClick={onClick}
		>
			<CalendarHeaderIcon
				Icon={<ChevronDoubleLeft css={iconStyles(theme.daily.calendar.icon.fill)} />}
			/>
			<CalendarHeaderIcon
				Icon={<ChevronLeft css={iconStyles(theme.daily.calendar.icon.fill)} />}
			/>
			<div
				css={css`
					width: calc(100% - 160px);
					height: 40px;
					display: flex;
					justify-content: center;
					align-items: center;

					font-size: 20px;
					font-weight: 500;
					color: ${theme.daily.calendar.item.text};
				`}
			>
				<span>
					{calendarStore.displayCurrentYear}년 {calendarStore.displayCurrentMonth}월
				</span>
			</div>
			<CalendarHeaderIcon
				Icon={<ChevronDoubleRight css={iconStyles(theme.daily.calendar.icon.fill)} />}
			/>
			<CalendarHeaderIcon
				Icon={<ChevronRight css={iconStyles(theme.daily.calendar.icon.fill)} />}
			/>
		</div>
	);
};

const iconStyles = (fill: string) => css`
	& path {
		fill: ${fill};
	}
`;

export default observer(CalendarHeader);

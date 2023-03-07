import styled from "@emotion/styled";

import CalendarWeek from "@/pages/daily/CalendarWeek";
import CalendarWeekTitles from "@/pages/daily/CalendarWeekTitles";

interface Props {
	rows: number;
	weeks: {
		date: string | number;
		saturDay: boolean;
		sunDay: boolean;
		isSelected: boolean;
		hasTask: boolean;
	}[][];
}

const CalendarBodyGrid: React.FC<Props> = ({ rows, weeks }) => {
	return (
		<>
			<CalendarWeekTitles />
			<Grid rows={rows}>
				{weeks.map((w, i) => (
					<CalendarWeek key={i} days={w} />
				))}
			</Grid>
		</>
	);
};

const Grid = styled.div<{ rows: number }>`
	display: grid;
	grid-template-rows: repeat(${({ rows }) => rows}, 1fr);
	grid-template-columns: repeat(1, 1fr);
	height: calc(100% - 80px);
`;

export default CalendarBodyGrid;

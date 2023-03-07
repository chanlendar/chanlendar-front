import styled from "@emotion/styled";

import CalendarDay from "@/pages/daily/CalendarDay";

interface Props {
	days?: {
		date: string | number;
		saturDay: boolean;
		sunDay: boolean;
		isSelected: boolean;
		hasTask: boolean;
	}[];
}

const CalendarWeek: React.FC<Props> = ({ days }) => {
	return (
		<Week>
			{days?.map(({ date, saturDay, sunDay, isSelected, hasTask }, i) => (
				<CalendarDay
					key={i}
					saturDay={saturDay}
					sunDay={sunDay}
					isSelected={isSelected}
					hasTask={hasTask}
					date={typeof date === "number" ? date : 0}
				>
					{date}
				</CalendarDay>
			))}
		</Week>
	);
};

const Week = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
`;

export default CalendarWeek;

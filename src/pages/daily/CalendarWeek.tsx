import styled from "@emotion/styled";
import CalendarDay from "./CalendarDay";

interface Props {
	days?: { date: string | number; saturDay: boolean; sunDay: boolean }[];
}

const CalendarWeek: React.FC<Props> = ({ days }) => {
	return (
		<Week>
			{days?.map(({ date, saturDay, sunDay }, i) => (
				<CalendarDay key={i} saturDay={saturDay} sunDay={sunDay}>
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

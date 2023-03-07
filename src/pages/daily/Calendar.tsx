import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import styled from "@emotion/styled";

import CalendarHeader from "@/pages/daily/CalendarHeader";
import ChooseMonth from "@/pages/daily/ChooseMonth";
import ChooseYear from "@/pages/daily/ChooseYear";
import CalendarBody from "@/pages/daily/CalendarBody";
import useStores from "@/hooks/useStore";

interface Props {}

const Calendar: React.FC<Props> = () => {
	const [processToChooseMonthYear, setProcess] = useState(false);
	const [openMonth, setOpenMonth] = useState(false);
	const [openYear, setOpenYear] = useState(false);
	const { calendarStore } = useStores();

	useEffect(() => {
		if (processToChooseMonthYear) setOpenMonth(true);
		else setOpenMonth(false);
	}, [processToChooseMonthYear]);

	return (
		<StyledLayout>
			<CalendarHeader onClick={() => setProcess((prev) => !prev)} />
			{openMonth && (
				<ChooseMonth
					onClose={() => {
						setOpenMonth(false);
						setOpenYear(true);
					}}
				/>
			)}
			{openYear && (
				<ChooseYear
					onClose={() => {
						setOpenYear(false);
						setProcess(false);
					}}
				/>
			)}
			{!processToChooseMonthYear && (
				<CalendarBody currentDay={calendarStore.currentDay} />
			)}
		</StyledLayout>
	);
};

const StyledLayout = styled.div`
	max-width: 420px;
	width: 420px;
	max-height: 280px;
	height: 280px;

	border-radius: 6px;

	background-color: ${({ theme }) => theme.daily.calendar.backgroundColor};
	box-shadow: ${({ theme }) => theme.daily.calendar.boxShadow};

	user-select: none;
`;

export default observer(Calendar);

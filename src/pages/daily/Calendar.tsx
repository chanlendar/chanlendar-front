import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import CalendarHeader from "@/pages/daily/CalendarHeader";
import ChooseMonth from "@/pages/daily/ChooseMonth";
import ChooseYear from "@/pages/daily/ChooseYear";

interface Props {}

// 연도 선택, 월 선택
// 헤더 (월 넘기기, 연 넘기기)
// 기본 동작: 특정 date가 주어지면 그 date의 월과 모든 요일을 보여주기
const Calendar: React.FC<Props> = () => {
	const [processToChooseMonthYear, setProcess] = useState(false);
	const [openMonth, setOpenMonth] = useState(false);
	const [openYear, setOpenYear] = useState(false);

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
`;

export default Calendar;

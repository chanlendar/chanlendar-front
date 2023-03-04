import styled from "@emotion/styled";

import { useState } from "react";
import CalendarHeader from "@/pages/daily/CalendarHeader";
import ChooseMonth from "@/pages/daily/ChooseMonth";
import ChooseYear from "./ChooseYear";

interface Props {}

// 연도 선택, 월 선택
// 헤더 (월 넘기기, 연 넘기기)
// 기본 동작: 특정 date가 주어지면 그 date의 월과 모든 요일을 보여주기
const Calendar: React.FC<Props> = () => {
	const [openMonth, setOpenMonth] = useState(false);

	return (
		<StyledLayout>
			<CalendarHeader onClick={() => setOpenMonth(true)} />
			{openMonth && <ChooseMonth onClose={() => setOpenMonth(false)} />}
			<ChooseYear />
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

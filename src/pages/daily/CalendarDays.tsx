import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

interface Props {
	currentDay: Dayjs;
}

const CalendarDays: React.FC<Props> = ({ currentDay }) => {
	useEffect(() => {
		// 시작일은 무슨 요일, 끝일은 몇일인지,
		// 무슨요일인지에 따라 갈림
		const weekCountOfStartDay = currentDay.startOf("month").week();
		const weekCountOfEndDay = currentDay.endOf("month").week();
		// console.log(weekCountOfEndDay - weekCountOfStartDay + 1);

		let s = currentDay.startOf("month");
		const e = currentDay.endOf("month");
		const weeks = [];
		let days = [];

		const weeksOfCurrentMonth = weekCountOfEndDay - weekCountOfEndDay + 1;

		const a = s.get("date");
		// dayjs.get("day") => 0 = sun, 6 = sat
		for (let i = a; i <= e.get("date"); i++) {
			days.push(i);
			if (s.get("day") === 6) {
				weeks.push(days);
				days = [];
			} else if (i === e.get("date")) {
				weeks.push(days);
				days = [];
			}

			s = s.add(1, "day");
		}
		console.log(weeks);
		// 한달에 몇 주 있는지 확인하고,
		// 몇 일 있는지 확인하고,
		// for문 돌리면서 2차원 배열 만듦
		// 전체 배열은 한 달을 나타내고,
		// 안의 내부 배열은 한 주를 나타냄
	}, []);
	return <div>{currentDay.format("YYYY-MM-DD")}</div>;
};

export default CalendarDays;

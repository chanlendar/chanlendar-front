import { Dayjs } from "dayjs";
import CalendarBodyGrid from "@/pages/daily/CalendarBodyGrid";

interface Props {
	currentDay: Dayjs;
}

const CalendarBody: React.FC<Props> = ({ currentDay }) => {
	let start = currentDay.startOf("month");
	const endDate = currentDay.endOf("month").get("date");
	const weeks = [];
	let days: { date: number | string; saturDay: boolean; sunDay: boolean }[] = [];

	const startDate = start.get("date");

	for (let i = startDate; i <= endDate; i++) {
		days.push({
			date: i,
			saturDay: start.get("day") === 6,
			sunDay: start.get("day") === 0,
		});
		if (start.get("day") === 6) {
			weeks.push(days);
			days = [];
		} else if (i === endDate) {
			weeks.push(days);
			days = [];
		}

		start = start.add(1, "day");
	}

	/**
	 * 첫번째, 마지막 주  모자란 요일 채우기
	 */
	const count = 7 - weeks[0].length;
	for (let i = 0; i < count; i++) {
		weeks[0].unshift({
			date: "",
			saturDay: false,
			sunDay: false,
		});
	}

	const c = 7 - weeks[weeks.length - 1].length;
	for (let i = 0; i < c; i++) {
		weeks[weeks.length - 1].push({
			date: "",
			saturDay: false,
			sunDay: false,
		});
	}

	return <CalendarBodyGrid weeks={weeks} rows={weeks.length} />;
};

export default CalendarBody;

import dayjs, { Dayjs } from "dayjs";
import CalendarBodyGrid from "@/pages/daily/CalendarBodyGrid";
import useStores from "@/hooks/useStore";
import { observer } from "mobx-react";

interface Props {
	currentDay: Dayjs;
}

const CalendarBody: React.FC<Props> = ({ currentDay }) => {
	const { subjectStore } = useStores();
	const weeks = [];
	let days: {
		date: number | string;
		saturDay: boolean;
		sunDay: boolean;
		isSelected: boolean;
		hasTask: boolean;
	}[] = [];

	let start = currentDay.startOf("month");
	const startDate = start.get("date");
	const endDate = currentDay.endOf("month").get("date");

	for (let i = startDate; i <= endDate; i++) {
		days.push({
			date: i,
			saturDay: start.get("day") === 6,
			sunDay: start.get("day") === 0,
			isSelected: start.isSame(dayjs(subjectStore.selectedDate), "day"),
			hasTask: false,
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
			isSelected: false,
			hasTask: false,
		});
	}

	const c = 7 - weeks[weeks.length - 1].length;
	for (let i = 0; i < c; i++) {
		weeks[weeks.length - 1].push({
			date: "",
			saturDay: false,
			sunDay: false,
			isSelected: false,
			hasTask: false,
		});
	}

	return <CalendarBodyGrid weeks={weeks} rows={weeks.length} />;
};

export default observer(CalendarBody);

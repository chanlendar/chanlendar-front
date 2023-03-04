import dayjs, { Dayjs } from "dayjs";
import { makeAutoObservable } from "mobx";

const DATE_FORMAT = "YYYYMMDD";

export default class CalendarStore {
	constructor() {
		makeAutoObservable(this, {});
	}

	currentDay: Dayjs = dayjs(Date.now());

	// 0 -> January, 1 -> Febuary, ...
	changeMonth(month: number) {
		this.currentDay = this.currentDay.set("month", month);
	}

	changeYear(year: number) {
		this.currentDay = this.currentDay.set("year", year);
	}

	get displayCurrentDate() {
		return this.currentDay.format(DATE_FORMAT);
	}

	get displayCurrentYear() {
		return this.currentDay.get("year");
	}

	get displayCurrentMonth() {
		return this.currentDay.get("month") + 1;
	}

	get yearsToChoose() {
		let firstYearToChoose = this.currentDay.subtract(6, "year").get("year");
		const years = [];

		for (let i = 0; i < 12; i++) {
			years.push(firstYearToChoose);
			firstYearToChoose++;
		}

		return years;
	}
}

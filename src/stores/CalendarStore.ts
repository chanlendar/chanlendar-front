import dayjs, { Dayjs } from "dayjs";
import { makeAutoObservable } from "mobx";

const DATE_FORMAT = "YYYYMMDD";
const initialDay = dayjs(Date.now());
export default class CalendarStore {
	constructor() {
		makeAutoObservable(this, {});
	}

	currentDay: Dayjs = initialDay;
	selectedDay: Dayjs = initialDay;

	// 0 -> January, 1 -> Febuary, ...
	changeMonth(month: number) {
		this.currentDay = this.currentDay.set("month", month);
	}

	changeYear(year: number) {
		this.currentDay = this.currentDay.set("year", year);
	}

	addMonth() {
		this.currentDay = this.currentDay.add(1, "month");
	}

	addYear() {
		this.currentDay = this.currentDay.add(1, "year");
	}

	subtractMonth() {
		this.currentDay = this.currentDay.subtract(1, "month");
	}

	subtractYear() {
		this.currentDay = this.currentDay.subtract(1, "year");
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

	changeSelectedDay(date: number) {
		if (date !== 0) this.selectedDay = this.currentDay.clone().set("date", date);
	}
}

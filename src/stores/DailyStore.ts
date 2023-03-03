import { action, computed, makeObservable, observable } from "mobx";
import { getToday } from "@/utils";

type DateString = string;
type DailyItem = {
	task: string;
	id: string;
	finished: boolean;
};
type DailyItems = DailyItem[];

export default class DailyStore {
	constructor() {
		makeObservable(this, {
			subjectId: observable,
			currentDay: observable,
			taskListTable: observable,
			changeSubject: action,
			changeDay: action,
			currentTasks: computed,
			createTask: action,
			modifyTask: action,
			deleteTask: action,
		});
	}

	subjectId = "";
	currentDay: DateString = "";
	taskListTable = new Map<DateString, DailyItems>();

	changeSubject(id: string) {
		this.subjectId = id;
	}

	changeDay(day: DateString) {
		this.currentDay = day;
	}

	changeCurrentDayToToday() {
		this.currentDay = getToday();
	}

	get currentTasks() {
		return this.taskListTable.get(this.currentDay) || [];
	}

	createTask(task: DailyItem) {
		if (this.taskListTable.has(this.currentDay)) {
			this.currentTasks.push(task);
		} else {
			this.taskListTable.set(this.currentDay, [task]);
		}
	}

	modifyTask(taskId: string, newTask: string) {
		const idx = this.currentTasks.findIndex((t) => t.id === taskId);
		this.currentTasks[idx].task = newTask;
	}

	deleteTask(taskId: string) {
		this.taskListTable.set(
			this.currentDay,
			this.currentTasks.filter((t) => t.id !== taskId),
		);
	}
}

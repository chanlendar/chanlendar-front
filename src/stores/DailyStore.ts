import { makeAutoObservable } from "mobx";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

export default class DailyStore {
	constructor() {
		makeAutoObservable(this);
	}

	/**
	 * ************************************
	 */
	// currentDay: DateString = getToday();
	// subjectsToDates: Map<string, Map<DateString, DailyList>> = new Map();
	// datesToDailyLists: Map<DateString, DailyList> = new Map();
	// dailyList: Tasks = [];

	// addTask(id: string, task: string) {
	// 	this.dailyList.push({ id, task, finished: false });
	// }

	// modifyTask(taskId: string, newTask: string) {
	// 	const idx = this.dailyList.findIndex((t) => t.id === taskId);
	// 	this.dailyList[idx].task = newTask;
	// }

	// deleteTask(taskId: string) {
	// 	this.dailyList = this.dailyList.filter((t) => t.id !== taskId);
	// }

	// finishTask(taskId: string, finished: boolean) {
	// 	const idx = this.dailyList.findIndex((t) => t.id === taskId);
	// 	this.dailyList[idx].finished = finished;
	// }
}

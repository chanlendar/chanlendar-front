import { finishTask } from "@/apis/dailies";
import { action, computed, makeObservable, observable } from "mobx";
import { getToday } from "@/utils";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

type DateString = string;
type DailyItem = {
	task: string;
	id: string;
	finished: boolean;
};
type DailyList = DailyItem[];

export default class DailyStore {
	constructor() {
		makeObservable(this, {
			currentDay: observable,
			subjectsToDates: observable,
			datesToDailyLists: observable,
			dailyList: observable,
			initializeBySubject: action,
			setDailyListFrom: action,
			addTask: action,
			modifyTask: action,
			deleteTask: action,
			finishTask: action,
		});
	}

	currentDay: DateString = getToday();
	subjectsToDates: Map<string, Map<DateString, DailyList>> = new Map();
	datesToDailyLists: Map<DateString, DailyList> = new Map();
	dailyList: DailyList = [];

	initializeBySubject(subjectId: string) {
		const map = new Map();
		map.set(this.currentDay, []);

		this.datesToDailyLists = map;
		this.subjectsToDates.set(subjectId, this.datesToDailyLists);
	}

	setDailyListFrom(qs: QuerySnapshot<DocumentData>) {
		const dailyList = qs.docs.map((d) => {
			return {
				id: d.data().id,
				task: d.data().task,
				finished: d.data().finished,
			};
		});

		this.datesToDailyLists.set(this.currentDay, dailyList);
		this.dailyList = dailyList;
	}

	addTask(id: string, task: string) {
		this.dailyList.push({ id, task, finished: false });
	}

	modifyTask(taskId: string, newTask: string) {
		const idx = this.dailyList.findIndex((t) => t.id === taskId);
		this.dailyList[idx].task = newTask;
	}

	deleteTask(taskId: string) {
		this.dailyList = this.dailyList.filter((t) => t.id !== taskId);
	}

	finishTask(taskId: string, finished: boolean) {
		const idx = this.dailyList.findIndex((t) => t.id === taskId);
		this.dailyList[idx].finished = finished;
	}
}

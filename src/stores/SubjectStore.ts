import { QuerySnapshot, Timestamp } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";
import { makeAutoObservable, toJS } from "mobx";

type Subject = { id: string; subject: string; createdAt: Date; updatedAt: Date };
type Subjects = Subject[];

type Task = {
	task: string;
	id: string;
	finished: boolean;
	date: Date;
	createdAt: Date;
	updatedAt: Date;
};
type Tasks = Task[];

type SubjectToDates = Map<string, DatesToTasks>;
type DatesToTasks = Map<string, Tasks>;

export default class SubjectStore {
	constructor() {
		makeAutoObservable(this);
	}

	subjects: Subjects = [];
	currentSubjectId = "";

	get empty() {
		return this.subjects.length === 0;
	}

	get currentSubject() {
		return this.subjects.find((s) => this.currentSubjectId === s.id);
	}

	get length() {
		return this.subjects.length;
	}

	// tasks는 같이 오지 않아서, 따로 받아와야 됨
	getSubjectsFromQuerySnapshot(qs: QuerySnapshot<DocumentData>) {
		// TODO => createdAt, updatedAt 추가
		this.subjects = qs.docs.map((doc) => ({
			id: doc.data().id as string,
			subject: doc.data().subject as string,
			createdAt: doc.data().createdAt.toDate() as Date,
			updatedAt: doc.data().updatedAt.toDate() as Date,
		}));
	}

	addSubject(subject: string, id: string, createdAt: Timestamp, updatedAt: Timestamp) {
		const result = {
			subject,
			id,
			createdAt: createdAt.toDate(),
			updatedAt: updatedAt.toDate(),
		};

		this.subjects.push(result);
	}

	changeSubjectName(newSubject: string, id: string) {
		const idx = this.subjects.findIndex((s) => s.id === id);
		this.subjects[idx].subject = newSubject;
	}

	deleteSubject(id: string) {
		if (id === this.currentSubjectId) this.changeCurrentSubjectId("");
		this.subjects = this.subjects.filter((s) => s.id !== id);
	}

	changeCurrentSubjectId(subjectId: string) {
		this.currentSubjectId = subjectId;
	}

	// ****Tasks****
	date: Date = new Date();
	selectedDate: Date = new Date();
	// Date Key Format - YYYYMM (string)
	subjectsToDates: SubjectToDates = new Map();

	get dateToString() {
		return toYearMonthString(this.date);
	}

	get selectedDateToString() {
		return toYearMonthString(this.selectedDate);
	}

	get canCreateSubjectsToDates() {
		return this.subjects.length >= 0 && this.currentSubjectId !== "";
	}

	createSubjectsToDatesFrom(subjects: Subjects) {
		subjects.forEach((s) => {
			this.subjectsToDates.set(s.id, this.subjectsToDates.get(s.id) || new Map());
		});
	}

	get hasDatesToTasks(): boolean {
		return this.subjectsToDates.has(this.currentSubjectId);
	}
	createSubjectsToDates() {
		this.subjectsToDates.set(this.currentSubjectId, new Map());
	}

	// TODO => subjectsToDates, datesToTasks 전용 트리 자료구조 만들기
	createTasksFrom(qs: QuerySnapshot<DocumentData>) {
		const datesToTasks = this.subjectsToDates.get(this.currentSubjectId)!;

		const tasks: Tasks = [];
		qs.forEach((r) => {
			const { id, task, date, finished, createdAt, updatedAt } = r.data();
			tasks.push({
				id,
				task,
				finished,
				date: date.toDate(),
				createdAt: createdAt.toDate(),
				updatedAt: updatedAt.toDate(),
			} as Task);
		});

		datesToTasks.set(this.dateToString, tasks);
	}

	get hasDailyList(): boolean {
		return (
			this.subjectsToDates?.get(this.currentSubjectId)?.has(this.selectedDateToString) ||
			false
		);
	}
	get dailyList(): Tasks {
		const tasks =
			this.subjectsToDates
				?.get(this.currentSubjectId)
				?.get(toYearMonthString(this.date)) || [];
		const result = tasks.filter((t) => t.date.getDate() === this.selectedDate.getDate());

		return result;
	}

	addTask(task: Task) {
		this.subjectsToDates.get(this.currentSubjectId)!.get(this.dateToString)!.push(task);
	}

	modifyTask(taskId: string, newTask: string) {
		const tasks = this.subjectsToDates
			.get(this.currentSubjectId)!
			.get(this.selectedDateToString)!;
		tasks.find((t) => t.id === taskId)!.task = newTask;
	}

	deleteTask(taskId: string) {
		const tasks = this.subjectsToDates
			.get(this.currentSubjectId)!
			.get(this.selectedDateToString)!
			.filter((t) => t.id !== taskId);

		this.subjectsToDates
			.get(this.currentSubjectId)!
			.set(this.selectedDateToString, tasks);
	}

	finishTask(taskId: string, finished: boolean) {
		this.subjectsToDates
			.get(this.currentSubjectId)!
			.get(this.selectedDateToString)!
			.find((t) => t.id === taskId)!.finished = finished;
	}
}

function toYearMonthString(date: Date) {
	return `${date.getFullYear()}${date.getMonth()}`;
}

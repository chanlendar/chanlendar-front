import { QuerySnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";
import { action, makeObservable, observable, computed } from "mobx";

type Subject = { id: string; name: string }[];

export default class SubjectStore {
	constructor() {
		makeObservable(this, {
			subjects: observable,
			getSubjectsFromQuerySnapshot: action,
			empty: computed,
			addSubject: action,
			changeSubjectName: action,
			deleteSubject: action,
		});
	}

	subjects: Subject = [];

	getSubjectsFromQuerySnapshot(qs: QuerySnapshot<DocumentData>) {
		this.subjects = qs.docs.map((doc) => ({
			id: doc.data().id as string,
			name: doc.data().name as string,
		}));
	}

	get empty() {
		return this.subjects.length === 0;
	}

	addSubject(name: string, id: string) {
		this.subjects.push({
			name,
			id,
		});
	}

	changeSubjectName(newName: string, id: string) {
		const idx = this.subjects.findIndex((s) => s.id === id);
		this.subjects[idx].name = newName;
	}

	deleteSubject(id: string) {
		this.subjects = this.subjects.filter((s) => s.id !== id);
	}
}

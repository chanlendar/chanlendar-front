import { QuerySnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";
import { action, makeObservable, observable, computed } from "mobx";

type Subjects = Subject[];
type Subject = { id: string; name: string };

const initialSubject = {
	id: "",
	name: "",
};

export default class SubjectStore {
	constructor() {
		makeObservable(this, {
			subjects: observable,
			subject: observable,
			getSubjectsFromQuerySnapshot: action,
			empty: computed,
			addSubject: action,
			changeSubjectName: action,
			deleteSubject: action,
			changeCurrentSubject: action,
		});
	}

	subjects: Subjects = [];
	subject: Subject = initialSubject;

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
		this.subject = {
			name,
			id,
		};
	}

	changeSubjectName(newName: string, id: string) {
		const idx = this.subjects.findIndex((s) => s.id === id);
		this.subjects[idx].name = newName;
		if (this.subject.id === id) this.subject.name = newName;
	}

	deleteSubject(id: string) {
		this.subjects = this.subjects.filter((s) => s.id !== id);
		if (this.subject.id === id) this.subject = initialSubject;
	}

	changeCurrentSubject(subjectId: string) {
		this.subject = this.subjects.find((s) => s.id === subjectId)!;
	}
}

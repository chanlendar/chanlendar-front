import { QuerySnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore/lite";
import { action, makeObservable, observable, computed } from "mobx";

type Subjects = Subject[];
type Subject = { id: string; subject: string };

const initialSubject = {
	id: "",
	subject: "",
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
		// TODO => createdAt, updatedAt 추가
		this.subjects = qs.docs.map((doc) => ({
			id: doc.data().id as string,
			subject: doc.data().subject as string,
		}));
	}

	get empty() {
		return this.subjects.length === 0;
	}

	addSubject(subject: string, id: string) {
		console.log(subject, id);
		this.subjects.push({
			subject,
			id,
		});
		this.subject = {
			subject,
			id,
		};
	}

	changeSubjectName(newSubject: string, id: string) {
		const idx = this.subjects.findIndex((s) => s.id === id);
		this.subjects[idx].subject = newSubject;
		if (this.subject.id === id) this.subject.subject = newSubject;
	}

	deleteSubject(id: string) {
		this.subjects = this.subjects.filter((s) => s.id !== id);
		if (this.subject.id === id) this.subject = initialSubject;
	}

	changeCurrentSubject(subjectId: string) {
		this.subject = this.subjects.find((s) => s.id === subjectId)!;
	}
}

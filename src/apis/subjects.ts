import {
	getFirestore,
	collection,
	getDocs,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";

import { insertCreateAtAndUpdatedAt, insertUpdatedAt } from "@/utils";

export const SUBJECT_COLLECTION_ORIGIN = "subjects";
export const SUBJECTS_PATH = "list";
const getSubjectsFullPathWithUid = (uid: string) => {
	return SUBJECT_COLLECTION_ORIGIN + "/" + uid + "/" + SUBJECTS_PATH;
};

async function getUserSubjects(uid: string) {
	const db = getFirestore();
	const querySnapshot = await getDocs(collection(db, getSubjectsFullPathWithUid(uid)));

	return querySnapshot;
}

async function createSubject(uid: string, name: string, id: string) {
	const db = getFirestore();
	const docRef = doc(db, getSubjectsFullPathWithUid(uid), id);

	await setDoc(docRef, {
		name,
		id,
		...insertCreateAtAndUpdatedAt(),
	});
}

async function changeSubjectName(uid: string, newName: string, id: string) {
	const db = getFirestore();
	const docRef = doc(db, getSubjectsFullPathWithUid(uid), id);

	await updateDoc(docRef, {
		name: newName,
		...insertUpdatedAt(),
	});
}

async function deleteSubject(uid: string, id: string) {
	const db = getFirestore();
	const docRef = doc(db, getSubjectsFullPathWithUid(uid), id);

	await deleteDoc(docRef);
}

export { getUserSubjects, createSubject, changeSubjectName, deleteSubject };

import {
	getFirestore,
	collection,
	getDocs,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
	orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { insertCreateAtAndUpdatedAt, insertUpdatedAt } from "@/utils";
import { getUserReference } from "@/apis/users";

export const SUBJECTS_COLLECTION = "subjects";

async function getSubjectsByUser(uid: string) {
	const db = getFirestore();
	const userRef = getUserReference(uid);

	const q = query(
		collection(db, SUBJECTS_COLLECTION),
		where("uid", "==", userRef),
		orderBy("createdAt"),
	);
	const querySnapshot = await getDocs(q);

	return querySnapshot;
}

async function createSubject(uid: string, subject: string) {
	const db = getFirestore();
	const id = uuidv4();
	const docRef = doc(db, SUBJECTS_COLLECTION, id);
	const userRef = getUserReference(uid);

	const data = {
		subject,
		id,
		uid: userRef,
		...insertCreateAtAndUpdatedAt(),
	};

	await setDoc(docRef, data);

	return data;
}

async function changeSubjectName(newSubject: string, id: string) {
	const db = getFirestore();

	const docRef = doc(db, SUBJECTS_COLLECTION, id);
	const data = {
		subject: newSubject,
		...insertUpdatedAt(),
	};

	await updateDoc(docRef, data);

	return data;
}

async function deleteSubject(id: string) {
	const db = getFirestore();
	const docRef = doc(db, SUBJECTS_COLLECTION, id);
	await deleteDoc(docRef);

	return { id };
}

export { getSubjectsByUser, createSubject, changeSubjectName, deleteSubject };

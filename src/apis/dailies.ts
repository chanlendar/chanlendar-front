import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	setDoc,
	updateDoc,
	deleteDoc,
	query,
	where,
	limit,
	doc,
} from "firebase/firestore";

import { insertCreateAtAndUpdatedAt, insertUpdatedAt } from "@/utils";
import { getDoc } from "firebase/firestore/lite";

const DAILY_COLLECTION_ORIGIN = "dailies";
// dailies/uid/subject_id/date/taskId

async function getDailyTasks(uid: string, subjectId: string, date: string) {
	const db = getFirestore();
	const querySnapshot = await getDocs(
		collection(db, DAILY_COLLECTION_ORIGIN, uid, subjectId, date, "list"),
	);

	return querySnapshot;
}

async function addDailyTask(
	uid: string,
	subjectId: string,
	date: string,
	taskId: string,
	task: string,
) {
	const db = getFirestore();
	const collectionRef = collection(
		db,
		DAILY_COLLECTION_ORIGIN,
		uid,
		subjectId,
		date,
		"list",
	);

	await addDoc(collectionRef, {
		task,
		id: taskId,
		finished: false,
		...insertCreateAtAndUpdatedAt(),
	});
}

async function modifyDailyTask(
	uid: string,
	subjectId: string,
	date: string,
	taskId: string,
	task: string,
) {
	const db = getFirestore();
	const collectionRef = collection(
		db,
		DAILY_COLLECTION_ORIGIN,
		uid,
		subjectId,
		date,
		"list",
	);

	const q = query(collectionRef, where("id", "==", taskId), limit(1));
	const d = await getDocs(q);

	const docRef = doc(collectionRef, d.docs[0].id);
	await updateDoc(docRef, {
		task,
		...insertUpdatedAt(),
	});
}

async function deleteDailyTask(
	uid: string,
	subjectId: string,
	date: string,
	taskId: string,
) {
	const db = getFirestore();
	const collectionRef = collection(
		db,
		DAILY_COLLECTION_ORIGIN,
		uid,
		subjectId,
		date,
		"list",
	);

	const q = query(collectionRef, where("id", "==", taskId), limit(1));
	const d = await getDocs(q);

	const docRef = doc(collectionRef, d.docs[0].id);

	await deleteDoc(docRef);
}

async function finishTask(
	uid: string,
	subjectId: string,
	date: string,
	taskId: string,
	finished: boolean,
) {
	const db = getFirestore();
	const collectionRef = collection(
		db,
		DAILY_COLLECTION_ORIGIN,
		uid,
		subjectId,
		date,
		"list",
	);

	const q = query(collectionRef, where("id", "==", taskId), limit(1));
	const d = await getDocs(q);

	const docRef = doc(collectionRef, d.docs[0].id);

	await updateDoc(docRef, {
		finished,
		...insertUpdatedAt(),
	});
}

export { addDailyTask, getDailyTasks, modifyDailyTask, deleteDailyTask, finishTask };

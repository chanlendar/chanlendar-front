import dayjs from "dayjs";
import {
	getFirestore,
	collection,
	getDocs,
	updateDoc,
	deleteDoc,
	query,
	where,
	doc,
	setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { insertCreateAtAndUpdatedAt, insertUpdatedAt } from "@/utils";
import { SUBJECTS_COLLECTION } from "@/apis/subjects";

const DAILY_COLLECTION = "tasks";

async function getTasksByMonth(subjectId: string, date: Date) {
	const db = getFirestore();
	const startDate = dayjs(date)
		.set("date", 1)
		.set("hour", 0)
		.set("minute", 0)
		.set("second", 0);
	const endDate = dayjs(date)
		.endOf("month")
		.set("hour", 23)
		.set("minute", 59)
		.set("second", 59);

	const q = query(
		collection(db, SUBJECTS_COLLECTION, subjectId, DAILY_COLLECTION),
		where("date", ">=", startDate.toDate()),
		where("date", "<=", endDate.toDate()),
	);

	const querySnapshot = await getDocs(q);

	return querySnapshot;
}

async function addDailyTask(subjectId: string, date: Date, task: string) {
	const db = getFirestore();
	const id = uuidv4();
	const docRef = doc(db, SUBJECTS_COLLECTION, subjectId, DAILY_COLLECTION, id);
	const data = {
		task,
		id,
		date,
		...insertCreateAtAndUpdatedAt(),
		finished: false,
	};

	await setDoc(docRef, data);

	return data;
}

async function modifyDailyTask(subjectId: string, id: string, task: string) {
	const db = getFirestore();
	const docRef = doc(db, SUBJECTS_COLLECTION, subjectId, DAILY_COLLECTION, id);

	const data = {
		task,
		id,
		...insertUpdatedAt(),
	};

	await updateDoc(docRef, data);

	return data;
}

async function deleteDailyTask(subjectId: string, taskId: string) {
	const db = getFirestore();
	const docRef = doc(db, SUBJECTS_COLLECTION, subjectId, DAILY_COLLECTION, taskId);

	await deleteDoc(docRef);

	return { id: taskId };
}

async function finishTask(subjectId: string, taskId: string, finished: boolean) {
	const db = getFirestore();
	const docRef = doc(db, SUBJECTS_COLLECTION, subjectId, DAILY_COLLECTION, taskId);

	const data = {
		finished,
		...insertUpdatedAt(),
	};

	updateDoc(docRef, data);

	return data;
}

export { addDailyTask, getTasksByMonth, modifyDailyTask, deleteDailyTask, finishTask };

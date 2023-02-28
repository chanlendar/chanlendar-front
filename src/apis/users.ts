import { insertCreateAtAndUpdatedAt, insertUpdatedAt } from "@/utils";
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	DocumentReference,
	DocumentData,
} from "firebase/firestore";

const USER_COLLECTION = "users";

async function updateMyProfile(email: string, name: string, uid: string) {
	const db = getFirestore();

	const docRef = doc(db, USER_COLLECTION, uid);
	const user = await getDoc(docRef);

	if (user.exists()) {
		await updateDoc(docRef, {
			...insertUpdatedAt(),
		});
	} else {
		await saveMyProfile(email, name, uid, docRef);
	}
}

async function saveMyProfile(
	email: string,
	name: string,
	uid: string,
	docRef: DocumentReference<DocumentData>,
) {
	setDoc(docRef, {
		email,
		name,
		uid,
		...insertCreateAtAndUpdatedAt(),
	});
}

export { updateMyProfile };

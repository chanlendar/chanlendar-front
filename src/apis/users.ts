import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	Timestamp,
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
			lastLoginAt: Timestamp.fromMillis(Date.now()),
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
		createdAt: Timestamp.fromMillis(Date.now()),
		lastLoginAt: Timestamp.fromMillis(Date.now()),
	});
}

export { updateMyProfile };

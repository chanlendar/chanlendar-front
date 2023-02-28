import { Timestamp } from "firebase/firestore";

function hasNull(...datas: any[]) {
	datas.forEach((v) => {
		if (!v) return true;
	});

	return false;
}

function insertCreateAtAndUpdatedAt() {
	return {
		createdAt: Timestamp.fromMillis(Date.now()),
		updatedAt: Timestamp.fromMillis(Date.now()),
	};
}

function insertUpdatedAt() {
	return {
		updatedAt: Timestamp.fromMillis(Date.now()),
	};
}

export { hasNull, insertCreateAtAndUpdatedAt, insertUpdatedAt };

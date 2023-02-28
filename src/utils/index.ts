import { Timestamp } from "firebase/firestore";
import Cookies, { CookieSetOptions } from "universal-cookie";

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

const cookies = new Cookies();

function getCookie(name: string) {
	return cookies.get(name);
}

function setCookie(name: string, value: any, options: CookieSetOptions = {}) {
	cookies.set(name, value, options);
}

function deleteCoookie(name: string) {
	cookies.remove(name);
}

export {
	hasNull,
	insertCreateAtAndUpdatedAt,
	insertUpdatedAt,
	getCookie,
	setCookie,
	deleteCoookie,
};

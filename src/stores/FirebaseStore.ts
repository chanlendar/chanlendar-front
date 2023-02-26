import { action, computed, makeObservable, observable } from "mobx";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore/lite";
import { FirebaseApp, initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyDOkniQX75iO6K_fz948T40zN4PZU11Hl4",
	authDomain: "chanlendar.firebaseapp.com",
	projectId: "chanlendar",
	storageBucket: "chanlendar.appspot.com",
	messagingSenderId: "792800235155",
	appId: "1:792800235155:web:69567e70272edfa7894766",
	measurementId: "G-208HHEN9GY",
};

export default class FirebaseStore {
	constructor() {
		makeObservable(this, {
			app: observable,
			auth: observable,
			initializeFirebase: action,
			getApp: computed,
			getAuth: computed,
		});
	}

	app: any;
	auth: any;
	firestore: any;

	initializeFirebase() {
		this.app = initializeApp(firebaseConfig);
		this.auth = getAuth(this.app);
		this.firestore = getFirestore(this.app);
	}

	get getApp() {
		return this.app as FirebaseApp;
	}

	get getAuth() {
		return this.auth as Auth;
	}

	get getFireStore() {
		return this.firestore as Firestore;
	}
}

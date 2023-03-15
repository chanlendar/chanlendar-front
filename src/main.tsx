import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayjs from "dayjs";

import App from "@/init/App";
import initializeReactModal from "@/init/InitializeReactModal";
dayjs.extend(weekOfYear);

const firebaseConfig = {
	apiKey: "AIzaSyDOkniQX75iO6K_fz948T40zN4PZU11Hl4",
	authDomain: "chanlendar.firebaseapp.com",
	projectId: "chanlendar",
	storageBucket: "chanlendar.appspot.com",
	messagingSenderId: "792800235155",
	appId: "1:792800235155:web:69567e70272edfa7894766",
	measurementId: "G-208HHEN9GY",
};

initializeApp(firebaseConfig);
initializeReactModal();

if (location.hostname === "localhost") {
	const firestore = getFirestore();
	const auth = getAuth();

	connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
	connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

Date.prototype.toYearMonthString = function () {
	return `${this.getFullYear()}${this.getMonth()}`;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

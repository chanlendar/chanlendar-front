import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/init/App";
import initializeReactModal from "@/init/InitializeReactModal";
import { initializeApp } from "firebase/app";
import weekOfYear from "dayjs/plugin/weekOfYear";
import dayjs from "dayjs";
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");

import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyDOkniQX75iO6K_fz948T40zN4PZU11Hl4",
	authDomain: "chanlendar.firebaseapp.com",
	projectId: "chanlendar",
	storageBucket: "chanlendar.appspot.com",
	messagingSenderId: "792800235155",
	appId: "1:792800235155:web:69567e70272edfa7894766",
	measurementId: "G-208HHEN9GY",
};

// Initialize Firebase
export default function () {
	initializeApp(firebaseConfig);
}
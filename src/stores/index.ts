import ThemeStore from "@/stores/ThemeStore";
import FirebaseStore from "@/stores/FirebaseStore";

export default {
	themeStore: new ThemeStore(),
	firebaseStore: new FirebaseStore(),
};

export type Stores = {
	themeStore: ThemeStore;
	firebaseStore: FirebaseStore;
};

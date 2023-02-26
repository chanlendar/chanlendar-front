import ThemeStore from "@/stores/ThemeStore";
import FirebaseStore from "@/stores/FirebaseStore";
import ProfileStore from "@/stores/ProfileStore";

export default {
	themeStore: new ThemeStore(),
	firebaseStore: new FirebaseStore(),
	profileStore: new ProfileStore(),
};

export type Stores = {
	themeStore: ThemeStore;
	firebaseStore: FirebaseStore;
	profileStore: ProfileStore;
};

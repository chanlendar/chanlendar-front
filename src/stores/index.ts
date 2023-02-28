import ThemeStore from "@/stores/ThemeStore";
import ProfileStore from "@/stores/ProfileStore";
import SubjectStore from "@/stores/SubjectStore";

export default {
	themeStore: new ThemeStore(),
	profileStore: new ProfileStore(),
	subjectStore: new SubjectStore(),
};

export type Stores = {
	themeStore: ThemeStore;
	profileStore: ProfileStore;
	subjectStore: SubjectStore;
};

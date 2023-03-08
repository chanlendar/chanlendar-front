import ThemeStore from "@/stores/ThemeStore";
import ProfileStore from "@/stores/ProfileStore";
import SubjectStore from "@/stores/SubjectStore";
import CalendarStore from "@/stores/CalendarStore";

export default {
	themeStore: new ThemeStore(),
	profileStore: new ProfileStore(),
	subjectStore: new SubjectStore(),
	calendarStore: new CalendarStore(),
};

export type Stores = {
	themeStore: ThemeStore;
	profileStore: ProfileStore;
	subjectStore: SubjectStore;
	calendarStore: CalendarStore;
};

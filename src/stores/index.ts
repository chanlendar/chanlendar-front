import ThemeStore from "@/stores/ThemeStore";
import ProfileStore from "@/stores/ProfileStore";
import SubjectStore from "@/stores/SubjectStore";
import DailyStore from "@/stores/DailyStore";
import CalendarStore from "./CalendarStore";

export default {
	themeStore: new ThemeStore(),
	profileStore: new ProfileStore(),
	subjectStore: new SubjectStore(),
	dailyStore: new DailyStore(),
	calendarStore: new CalendarStore(),
};

export type Stores = {
	themeStore: ThemeStore;
	profileStore: ProfileStore;
	subjectStore: SubjectStore;
	dailyStore: DailyStore;
	calendarStore: CalendarStore;
};

import ThemeStore from "@/stores/ThemeStore";

export default {
	themeStore: new ThemeStore(),
};

export type Stores = {
	themeStore: ThemeStore;
};

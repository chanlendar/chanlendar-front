import { action, computed, makeObservable, observable } from "mobx";

type Theme = "dark" | "light";

export default class ThemeStore {
	constructor() {
		makeObservable(
			this,
			{
				currentTheme: observable,
				theme: observable,
				getThemeStyles: computed,
				flipTheme: action,
			},
			{
				name: "ThemeStore",
			},
		);
	}

	currentTheme: Theme = this.initializeCurrentTheme();

	theme = {
		light: {
			str: `I'm a light!`,
		},
		dark: {
			str: `I'm a dark!`,
		},
	};

	private initializeCurrentTheme(): Theme {
		const isBrowserDefaultDark =
			window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

		let initTheme: Theme = isBrowserDefaultDark ? "dark" : "light";
		const localSettingTheme = localStorage.getItem("theme") as Theme;

		if (localSettingTheme) initTheme = localSettingTheme;

		return initTheme;
	}

	get getThemeStyles() {
		return this.theme[this.currentTheme];
	}

	flipTheme() {
		this.currentTheme = this.currentTheme === "dark" ? "light" : "dark";
	}
}

import { action, computed, makeObservable, observable } from "mobx";

type Theme = "dark" | "light";

export type ThemeStyleForEmotion = {
	header: {
		backgroundColor: string;
		borderBottom: string;
		title: {
			color: string;
		};
	};
	body: {
		backgroundColor: string;
	};
	login: {
		backgroundColor: string;
		welcomTextColor: string;
		buttonBorderColor: string;
		buttonTextColor: string;
	};
};

type ThemeStyle = {
	light: ThemeStyleForEmotion;
	dark: ThemeStyleForEmotion;
};

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

	theme: ThemeStyle = {
		light: {
			header: {
				backgroundColor: "#FAFAFA",
				borderBottom: "#BDBDBD",
				title: {
					color: "#000000",
				},
			},
			body: {
				backgroundColor: "#FAFAFA",
			},
			login: {
				backgroundColor: "#ffffff",
				welcomTextColor: "#000000",
				buttonBorderColor: "#E8EAF6",
				buttonTextColor: "#424242",
			},
		},
		dark: {
			header: {
				backgroundColor: "#212121",
				borderBottom: "#BDBDBD",
				title: {
					color: "#FAFAFA",
				},
			},
			body: {
				backgroundColor: "#212121",
			},
			login: {
				backgroundColor: "#424242",
				welcomTextColor: "#FAFAFA",
				buttonBorderColor: "#9E9E9E",
				buttonTextColor: "#FAFAFA",
			},
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

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

	theme: ThemeStyle = themeStyle;

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

type ThemeStyle = {
	light: ThemeStyleForEmotion;
	dark: ThemeStyleForEmotion;
};

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

	sidebar: {
		backgroundColor: string;
		subject: {
			backgroundColor: string;
			hoverColor: string;
			hoverBackgroundColor: string;
		};
		contextMenu: {
			backgroundColor: string;
			borderColor: string;
			changeNameColor: string;
		};
		hoveredTitle: {
			backgroundColor: string;
			color: string;
		};
	};

	daily: {
		backgroundColor: string;
	};

	button: {
		textColor: string;
		borderColor: string;
		backgroundColor: string;
	};

	modal: {
		backgroundColor: string;
		titleColor: string;
		inputBackgroundColor: string;
		cancelButtonColor: string;
		cancelButtonBackgroundColor: string;
		yesButtonColor: string;
		yesButtonBackgroundColor: string;
		borderColor: string;
	};
};

const themeStyle: ThemeStyle = {
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
		sidebar: {
			backgroundColor: "#E0E0E0",
			subject: {
				backgroundColor: "#BDBDBD",
				hoverColor: "#FAFAFA",
				hoverBackgroundColor: "#000000",
			},
			contextMenu: {
				backgroundColor: "#F5F5F5",
				borderColor: "#E0E0E0",
				changeNameColor: "#000000",
			},
			hoveredTitle: {
				backgroundColor: "#424242",
				color: "#FFFFFF",
			},
		},
		daily: {
			backgroundColor: "#EEEEEE",
		},
		button: {
			textColor: "#000000",
			borderColor: "#BDBDBD",
			backgroundColor: "transparent",
		},
		modal: {
			backgroundColor: "#FAFAFA",
			titleColor: "#000000",
			inputBackgroundColor: "#EEEEEE",
			cancelButtonColor: "#616161",
			cancelButtonBackgroundColor: "#F5F5F5",
			yesButtonColor: "#212121",
			yesButtonBackgroundColor: "#BDBDBD",
			borderColor: "#BDBDBD",
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
		sidebar: {
			backgroundColor: "#212121",
			subject: {
				backgroundColor: "#616161",
				hoverColor: "#212121",
				hoverBackgroundColor: "#FAFAFA",
			},
			contextMenu: {
				backgroundColor: "#424242",
				borderColor: "#757575",
				changeNameColor: "#EEEEEE",
			},
			hoveredTitle: {
				backgroundColor: "#EEEEEE",
				color: "#424242",
			},
		},
		daily: {
			backgroundColor: "#424242",
		},
		button: {
			textColor: "#FAFAFA",
			borderColor: "#FAFAFA",
			backgroundColor: "transparent",
		},
		modal: {
			backgroundColor: "#424242",
			titleColor: "#F5F5F5",
			inputBackgroundColor: "#757575",
			cancelButtonColor: "#EEEEEE",
			cancelButtonBackgroundColor: "#757575",
			yesButtonColor: "#212121",
			yesButtonBackgroundColor: "#FAFAFA",
			borderColor: "#BDBDBD",
		},
	},
};

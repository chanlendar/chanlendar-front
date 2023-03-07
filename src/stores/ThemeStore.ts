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
		dailyBackgroundColor: string;
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
		hoveredTitle: {
			backgroundColor: string;
			color: string;
		};
	};

	daily: {
		backgroundColor: string;
		list: {
			backgroundColor: string;
			titleColor: string;
			boxShadow: string;
		};
		item: {
			borderColor: string;
			color: string;
			finishedColor: string;
		};
		calendar: {
			backgroundColor: string;
			boxShadow: string;
			item: {
				text: string;
				selectedText: string;
				selectedBackground: string;
				borderColor: string;
			};
			icon: {
				fill: string;
			};
		};
	};

	button: {
		textColor: string;
		borderColor: string;
		backgroundColor: string;
	};

	contextMenu: {
		backgroundColor: string;
		borderColor: string;
		color: string;
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
			dailyBackgroundColor: "#E0E0E0",
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
			hoveredTitle: {
				backgroundColor: "#424242",
				color: "#FFFFFF",
			},
		},
		daily: {
			backgroundColor: "#EEEEEE",
			list: {
				backgroundColor: "#FFFFFF",
				titleColor: "#000000",
				boxShadow: "0px 1px 8px #E0E0E0",
			},
			item: {
				borderColor: "#000000",
				color: "#000000",
				finishedColor: "#757575",
			},
			calendar: {
				backgroundColor: "#FFFFFF",
				boxShadow: "0px 1px 8px #E0E0E0;",
				item: {
					text: "#000000",
					selectedText: "#FAFAFA",
					selectedBackground: "#212121",
					borderColor: "#212121",
				},
				icon: {
					fill: "#000000",
				},
			},
		},
		button: {
			textColor: "#000000",
			borderColor: "#BDBDBD",
			backgroundColor: "transparent",
		},
		contextMenu: {
			backgroundColor: "#F5F5F5",
			borderColor: "#E0E0E0",
			color: "#000000",
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
			dailyBackgroundColor: "#212121",
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
			hoveredTitle: {
				backgroundColor: "#EEEEEE",
				color: "#424242",
			},
		},
		daily: {
			backgroundColor: "#424242",
			list: {
				backgroundColor: "#757575",
				titleColor: "#FAFAFA",
				boxShadow: "0px 1px 8px rgba(117, 117, 117, 0.5);",
			},
			item: {
				borderColor: "#FAFAFA",
				color: "#FAFAFA",
				finishedColor: "#929292",
			},
			calendar: {
				backgroundColor: "#757575",
				boxShadow: "0px 1px 8px rgba(117, 117, 117, 0.5);",
				item: {
					text: "#FAFAFA",
					selectedText: "#000000",
					selectedBackground: "#FAFAFA",
					borderColor: "#FAFAFA",
				},
				icon: {
					fill: "#FAFAFA",
				},
			},
		},
		button: {
			textColor: "#FAFAFA",
			borderColor: "#FAFAFA",
			backgroundColor: "transparent",
		},
		contextMenu: {
			backgroundColor: "#424242",
			borderColor: "#757575",
			color: "#EEEEEE",
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

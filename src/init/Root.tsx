import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GlobalStyles from "@/init/GlobalStyles";
import BaseLayoutWithChildren from "@/init/BaseLayoutWithChildren";
import RequireAuth from "@/init/RequireAuth";
import RequireNonUser from "./RequireNonUser";
import UpdateUserCookieWhenExit from "@/init/UpdateUserCookieWhenExit";
import TryLoginAutomatically from "@/init/TryLoginAutomatically";
import Login from "@/pages/login/Login";
import Daily from "@/pages/daily/Daily";
import useStores from "@/hooks/useStore";

const Root = () => {
	const { themeStore, firebaseStore } = useStores();

	useEffect(() => {
		firebaseStore.initializeFirebase();
	}, []);

	return (
		<CookiesProvider>
			<UpdateUserCookieWhenExit />
			<TryLoginAutomatically />
			<ThemeProvider theme={themeStore.getThemeStyles}>
				<GlobalStyles />
				<RouterProvider router={router} />
			</ThemeProvider>
		</CookiesProvider>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<RequireAuth>
				<BaseLayoutWithChildren>here is the base</BaseLayoutWithChildren>
			</RequireAuth>
		),
	},
	{
		path: "/login",
		element: (
			<RequireNonUser>
				<BaseLayoutWithChildren>
					<Login />
				</BaseLayoutWithChildren>
			</RequireNonUser>
		),
	},
	{
		path: "/daily",
		element: (
			<RequireAuth>
				<BaseLayoutWithChildren>
					<Daily />
				</BaseLayoutWithChildren>
			</RequireAuth>
		),
	},
]);

export default observer(Root);

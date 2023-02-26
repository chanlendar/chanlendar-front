import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import GlobalStyles from "@/init/GlobalStyles";
import BaseLayout from "@/init/BaseLayoutWithChildren";
import RequireAuth from "@/init/RequireAuth";
import RequireNonUser from "./RequireNonUser";
import UpdateUserCookieWhenExit from "@/init/UpdateUserCookieWhenExit";
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
				<BaseLayout>here is the base</BaseLayout>
			</RequireAuth>
		),
	},
	{
		path: "/login",
		element: (
			<RequireNonUser>
				<BaseLayout>
					<Login />
				</BaseLayout>
			</RequireNonUser>
		),
	},
	{
		path: "/daily",
		element: (
			<BaseLayout>
				<Daily />
			</BaseLayout>
		),
	},
]);

export default observer(Root);

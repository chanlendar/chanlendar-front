import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "mobx-react";

import stores from "@/stores";
import Root from "@/Root";
import Auth from "@/components/Auth";
import Login from "@/pages/login/Login";
import Daily from "@/pages/daily/Daily";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Auth>
				<Root />
			</Auth>
		),
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "daily",
				element: <Daily />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider
			profileStore={stores.profileStore}
			firebaseStore={stores.firebaseStore}
			themeStore={stores.themeStore}
		>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");

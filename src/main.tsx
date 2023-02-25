import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import initializeFirebase from "@/firebase";
import Root from "@/Root";
import Login from "@/pages/login/Login";
import Daily from "@/pages/daily/Daily";

initializeFirebase();

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
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
		<RouterProvider router={router} />
	</React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");

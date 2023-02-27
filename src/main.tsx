import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/init/App";
import initializeReactModal from "@/init/InitializeReactModal";

initializeReactModal();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");

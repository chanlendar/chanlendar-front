import { Provider } from "mobx-react";

import GlobalStyles from "@/components/GlobalStyles";

import stores from "@/stores";
import App from "./App";

function Root() {
	return (
		<>
			<GlobalStyles />
			<Provider firebaseStore={stores.firebaseStore} themeStore={stores.themeStore}>
				<App />
			</Provider>
		</>
	);
}

export default Root;

import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react";

import useStores from "@/hooks/useStore";
import Header from "@/components/Header";
import { useEffect } from "react";

interface Props {}

const App: React.FC<Props> = () => {
	const { themeStore, firebaseStore } = useStores();

	useEffect(() => {
		firebaseStore.initializeFirebase();
	}, []);

	return (
		<ThemeProvider theme={themeStore.getThemeStyles}>
			<Header />
			<Outlet />
		</ThemeProvider>
	);
};

export default observer(App);

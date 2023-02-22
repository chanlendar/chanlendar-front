import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react";

import useStores from "@/hooks/useStore";
import Header from "@/components/Header";

interface Props {}

const App: React.FC<Props> = () => {
	const { themeStore } = useStores();
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/login");
	}, []);

	return (
		<ThemeProvider theme={themeStore.getThemeStyles}>
			<Header />
			<Outlet />
		</ThemeProvider>
	);
};

export default observer(App);

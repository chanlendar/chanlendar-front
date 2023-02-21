import { Outlet, Link } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { observer } from "mobx-react";

import useStores from "@/hooks/useStore";
import Header from "@/components/Header";

interface Props {}

const App: React.FC<Props> = () => {
	const { themeStore } = useStores();

	return (
		<ThemeProvider theme={themeStore.getThemeStyles}>
			<Header />
			<Link to={"/"}>Root</Link>
			<Link to={"/login"}>Login</Link>
			<Link to={"/daily"}>Daily</Link>
			<Outlet />
		</ThemeProvider>
	);
};

export default observer(App);

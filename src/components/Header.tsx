import { observer } from "mobx-react";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import useStores from "@/hooks/useStore";

interface Props {}

const Header: React.FC<Props> = () => {
	const { themeStore } = useStores();
	const theme = useTheme();

	useEffect(() => {
		console.log(themeStore.currentTheme);
	}, [themeStore.currentTheme]);

	useEffect(() => {
		console.log(theme);
	}, [theme]);

	return <header onClick={() => themeStore.flipTheme()}>this is header</header>;
};

export default observer(Header);

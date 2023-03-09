import { css, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react";

import LogOut from "@/components/LogOut";
import useStores from "@/hooks/useStore";
import useCookie from "@/hooks/useCookie";
import LightTheme from "@/icons/LightTheme";
import DarkTheme from "@/icons/DarkTheme";

interface Props {}

const Header: React.FC<Props> = () => {
	const theme = useTheme();
	const { themeStore } = useStores();

	const location = useLocation();
	const titleBackgroundColor = getTitleBackgroundColor(location.pathname, theme);
	const onIconClick = () => {
		themeStore.flipTheme();
	};

	const [getCookie] = useCookie();

	return (
		<Head backgroundColor={titleBackgroundColor}>
			<Link to={"/"}>
				<Title>Chanlendar</Title>
			</Link>
			<div
				css={css`
					display: flex;
				`}
			>
				{getCookie("user") && <LogOut />}
				{themeStore.currentTheme === "dark" ? (
					<DarkTheme fill="#FAFAFA" onClick={onIconClick} />
				) : (
					<LightTheme fill="#EF5350" onClick={onIconClick} />
				)}
			</div>
		</Head>
	);
};

const getTitleBackgroundColor = (path: string, theme: Theme) => {
	if (path === "/daily") return theme.header.dailyBackgroundColor;
	return theme.header.backgroundColor;
};

const Head = styled.header<{ backgroundColor: string }>`
	height: 56px;
	background-color: ${({ backgroundColor }) => backgroundColor};
	border-bottom: 1px solid ${({ theme }) => theme.header.borderBottom};

	padding: 0 20px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.div`
	font-size: 20px;
	font-weight: bold;
	color: ${({ theme }) => theme.header.title.color};
	cursor: pointer;
`;

export default observer(Header);

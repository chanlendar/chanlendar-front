import { observer } from "mobx-react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import useStores from "@/hooks/useStore";
import LightTheme from "@/icons/LightTheme";
import DarkTheme from "@/icons/DarkTheme";

interface Props {}

const Header: React.FC<Props> = () => {
	const { themeStore } = useStores();

	const onIconClick = () => {
		themeStore.flipTheme();
	};

	return (
		<Head>
			<Link to={"/"}>
				<Title>Chanlendar</Title>
			</Link>
			{themeStore.currentTheme === "dark" ? (
				<DarkTheme fill="#FAFAFA" onClick={onIconClick} />
			) : (
				<LightTheme fill="#EF5350" onClick={onIconClick} />
			)}
		</Head>
	);
};

const Head = styled.header`
	height: 56px;
	background-color: ${({ theme }) => theme.header.backgroundColor};
	border-bottom: 1px solid ${({ theme }) => theme.header.borderBottom};

	padding: 0 20px;

	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.div`
	font-size: 20px;
	color: ${({ theme }) => theme.header.title.color};
	cursor: pointer;
`;

export default observer(Header);

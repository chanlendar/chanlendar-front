import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";
import { MouseEvent, useState } from "react";

import ContextMenu from "@/components/ContextMenu";
import CreateButton from "@/components/sidebar/CreateButton";
import Subject from "@/components/sidebar/Subject";
import HoveredTitle from "@/components/sidebar/HoveredTitle";

const initialContextMenu = {
	show: false,
	x: 0,
	y: 0,
};

interface Props {}

const Sidebar: React.FC<Props> = () => {
	const theme = useTheme();

	const [contextMenu, setContextMenu] = useState(initialContextMenu);

	const onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();

		const { pageX, pageY } = e;
		setContextMenu({
			show: true,
			x: pageX,
			y: pageY,
		});
	};

	//******* 가짜 Subject 용 *******
	const [subjects, setSubjects] = useState([
		{ id: 1, name: "Abcd" },
		{
			id: 2,
			name: "장찬희",
		},
		{
			id: 3,
			name: "Korea National Open Universicy",
		},
		{
			id: 4,
			name: "OnXi",
		},
	]);

	const [id, setId] = useState(0);
	const onMouseEnter = (id: number) => () => {
		setId(id);
	};
	const onMouseLeave = () => {
		setId(0);
	};

	return (
		<Container>
			{subjects.map((s) => (
				<Subject
					key={s.id}
					onContextMenu={onContextMenu}
					onMouseEnter={onMouseEnter(s.id)}
					onMouseLeave={onMouseLeave}
				>
					{s.name[0]}
					<HoveredTitle show={s.id === id}>{s.name}</HoveredTitle>
				</Subject>
			))}
			<CreateButton />
			<ContextMenu
				x={contextMenu.x}
				y={contextMenu.y}
				closeIfOutsideClicked
				closeContextMenu={() => setContextMenu({ show: false, x: 0, y: 0 })}
				show={contextMenu.show}
			>
				<ContextMenuItemContainer>
					<div
						css={[
							contextItemBaseStyles,
							css`
								color: ${theme.sidebar.contextMenu.changeNameColor};
							`,
						]}
					>
						이름 변경
					</div>
					<div
						css={[
							contextItemBaseStyles,
							css`
								color: #e53935;
							`,
						]}
					>
						주제 삭제
					</div>
				</ContextMenuItemContainer>
			</ContextMenu>
		</Container>
	);
};

const Container = styled.ul`
	display: flex;
	flex-direction: column;

	width: 72px;
	height: calc(100vh - 56px);
	background-color: ${({ theme }) => theme.body.backgroundColor};
	overflow-y: auto;
	padding: 0px 12px;

	justify-items: center;

	& > li {
		margin-top: 12px;
	}
`;

const ContextMenuItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;

	border: 1px solid ${({ theme }) => theme.sidebar.contextMenu.borderColor};

	& > div:not(:first) {
		border-top: 1px solid ${({ theme }) => theme.sidebar.contextMenu.borderColor};
	}

	background-color: ${({ theme }) => theme.sidebar.contextMenu.backgroundColor};
	user-select: none;
	cursor: pointer;
`;

const contextItemBaseStyles = css`
	padding: 10px;
	font-weight: bold;
	font-size: 14px;
`;

export default Sidebar;

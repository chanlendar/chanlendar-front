import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { useState } from "react";

import ContextMenu from "@/components/ContextMenu";
import CreateButton from "@/components/sidebar/CreateButton";
import Subject from "@/components/sidebar/Subject";
import HoveredTitle from "@/components/sidebar/HoveredTitle";
import Modal from "@/components/Modal";
import useContextMenu from "@/hooks/useContextMenu";
import useInput from "@/hooks/useInput";
import useModal from "@/hooks/useModal";

interface Props {}

const Sidebar: React.FC<Props> = () => {
	const theme = useTheme();

	// useContextMenu Hook
	const [contextMenu, _, onContextMenu, closeContextMenu] = useContextMenu();
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

	//****** 모달용 */
	const [isModalOpen, setModalOpen, onClose] = useModal(false, () => {
		setModalOpen(false);
	});
	const [input, setInput, onInputChange] = useInput("");

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
			<CreateButton onClick={() => setModalOpen(true)} />
			<ContextMenu
				x={contextMenu.x}
				y={contextMenu.y}
				closeIfOutsideClicked
				closeContextMenu={closeContextMenu}
				show={contextMenu.show}
			>
				<ContextMenuItemContainer>
					<div css={[contextItemBaseStyles, changeNameStyles(theme)]}>이름 변경</div>
					<div css={[contextItemBaseStyles, deleteSubjectStyles]}>주제 삭제</div>
				</ContextMenuItemContainer>
			</ContextMenu>
			<Modal
				isOpen={isModalOpen}
				title="어떤 주제인가요?"
				onRequestClose={onClose}
				yesButtonText="생성"
				yesButtonFunction={() => console.log("asdf")}
				cancelButtonFunction={() => console.log("qwer")}
			>
				<input
					type="text"
					css={css`
						border-radius: 4px;
						border: none;
						background-color: ${theme.modal.inputBackgroundColor};
						padding: 10px 10px;
					`}
					value={input}
					onChange={onInputChange}
				/>
			</Modal>
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

const changeNameStyles = (theme: Theme) => css`
	color: ${theme.sidebar.contextMenu.changeNameColor};
`;

const deleteSubjectStyles = css`
	color: #e53935;
`;

export default Sidebar;

import { css, useTheme } from "@emotion/react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { observer } from "mobx-react-lite";
import { v4 as uuidv4 } from "uuid";

import useContextMenu from "@/hooks/useContextMenu";
import useInput from "@/hooks/useInput";
import useModal from "@/hooks/useModal";
import useStores from "@/hooks/useStore";

import { changeSubjectName, createSubject, deleteSubject } from "@/apis/subjects";

import ContextMenu from "@/components/contextMenu/ContextMenu";
import ContextMenuItem from "@/components/contextMenu/ContextMenuItem";
import CreateButton from "@/components/sidebar/CreateButton";
import Subject from "@/components/sidebar/Subject";
import HoveredTitle from "@/components/sidebar/HoveredTitle";
import Modal from "@/components/Modal";

interface Props {}

const Subjects = (props: React.PropsWithChildren<Props>) => {
	const theme = useTheme();
	const [cookies] = useCookies(["user"]);
	const { subjectStore, dailyStore } = useStores();

	const onSubjectClick = (subjectId: string) => () => {
		dailyStore.changeSubject(subjectId);
	};

	const onYesButtonClick = () => {
		(async () => {
			const id = uuidv4();
			await createSubject(cookies["user"]?.uid, input, id);
			subjectStore.addSubject(input, id);
			dailyStore.changeSubject(id);
			dailyStore.changeCurrentDayToToday();
			setInput("");
			setModalOpen(false);
		})();
	};

	const onCancelButtonClick = () => {
		setInput("");
		setModalOpen(false);
	};

	const [id, setId] = useState("");
	const [idToModify, setIdToModify] = useState("");
	const onMouseEnter = (id: string) => () => {
		setId(id);
		setIdToModify(id);
	};
	const onMouseLeave = () => {
		setId("");
	};

	const [contextMenu, _, onContextMenu, closeContextMenu] = useContextMenu();

	const [input, setInput, onInputChange] = useInput("");

	const [isModalOpen, setModalOpen, onClose] = useModal(false, () => {
		setModalOpen(false);
		setInput("");
	});

	const [isEditSubjectOpen, setEditSubjectOpen, onEditSubjectClose] = useModal(
		false,
		() => {
			setEditSubjectOpen(false);
			setInput("");
		},
	);

	const onEditSubjectClick = () => {
		setEditSubjectOpen(true);
	};

	const onEditSubjectCancel = () => {
		setEditSubjectOpen(false);
		setInput("");
	};

	const onChangeSubjectName = () => {
		changeSubjectName(cookies["user"]?.uid, input, idToModify);
		subjectStore.changeSubjectName(input, idToModify);
		setEditSubjectOpen(false);
		setInput("");
		setIdToModify("");
	};

	const onDeleteSubjectClick = () => {
		deleteSubject(cookies["user"]?.uid, idToModify);
		subjectStore.deleteSubject(idToModify);
		setEditSubjectOpen(false);
		setInput("");
		setIdToModify("");
		closeContextMenu();
	};

	return (
		<>
			{subjectStore.subjects.map((s) => (
				<Subject
					key={s.id}
					onClick={onSubjectClick(s.id)}
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
				<ContextMenuItem onClick={onEditSubjectClick}>이름 변경</ContextMenuItem>
				<ContextMenuItem alert onClick={onDeleteSubjectClick}>
					주제 삭제
				</ContextMenuItem>
			</ContextMenu>
			<Modal
				isOpen={isModalOpen}
				title="어떤 주제인가요?"
				onRequestClose={onClose}
				yesButtonText="생성"
				yesButtonFunction={onYesButtonClick}
				cancelButtonFunction={onCancelButtonClick}
			>
				<input
					type="text"
					css={css`
						border-radius: 4px;
						border: none;
						background-color: ${theme.modal.inputBackgroundColor};
						padding: 10px 10px;
						width: 100%;
					`}
					value={input}
					onChange={onInputChange}
				/>
			</Modal>
			<Modal
				isOpen={isEditSubjectOpen}
				title="어떤 주제로 변경하시는 건가요?"
				onRequestClose={onEditSubjectClose}
				yesButtonText="변경"
				yesButtonFunction={onChangeSubjectName}
				cancelButtonFunction={onEditSubjectCancel}
			>
				<input
					type="text"
					css={css`
						border-radius: 4px;
						border: none;
						background-color: ${theme.modal.inputBackgroundColor};
						padding: 10px 10px;
						width: 100%;
					`}
					value={input}
					onChange={onInputChange}
				/>
			</Modal>
		</>
	);
};

export default observer(Subjects);

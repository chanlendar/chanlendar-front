import { css, useTheme } from "@emotion/react";
import { useState } from "react";
import { observer } from "mobx-react-lite";

import useContextMenu from "@/hooks/useContextMenu";
import useInput from "@/hooks/useInput";
import useModal from "@/hooks/useModal";
import useStores from "@/hooks/useStore";
import useCookie from "@/hooks/useCookie";

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
	const [getCookie] = useCookie();
	const { subjectStore } = useStores();

	const [hoverId, setHoverId] = useState("");

	const onHoverEnter = (id: string) => () => {
		setHoverId(id);
	};

	const onHoverLeave = () => {
		setHoverId("");
	};

	const onSubjectClick = (subjectId: string) => () => {
		subjectStore.changeCurrentSubjectId(subjectId);
	};

	const onYesButtonClick = () => {
		(async () => {
			const data = await createSubject(getCookie("user").uid, input);
			subjectStore.addSubject(data.subject, data.id, data.createdAt, data.updatedAt);
			subjectStore.changeCurrentSubjectId(data.id);
			setInput("");
			setModalOpen(false);
		})();
	};

	const onCancelButtonClick = () => {
		setInput("");
		setModalOpen(false);
	};

	const [contextMenu, _, onContextMenu, closeContextMenu] = useContextMenu();
	const [id, setId] = useState("");
	const changeIdWhenContextMenuOpened = (id: string) => {
		setId(id);
	};

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

	const onChangeSubjectName = async () => {
		await changeSubjectName(input, id);
		// TODO => updatedAt??? ???????????? ?????????
		subjectStore.changeSubjectName(input, id);
		setEditSubjectOpen(false);

		setId("");
		setInput("");
	};

	const onDeleteSubjectClick = async () => {
		await deleteSubject(id);
		subjectStore.deleteSubject(id);
		setEditSubjectOpen(false);
		setInput("");
		setId("");
		closeContextMenu();
	};

	return (
		<>
			{subjectStore.subjects.map((s) => (
				<Subject
					key={s.id}
					onClick={onSubjectClick(s.id)}
					onContextMenu={onContextMenu(s.id, changeIdWhenContextMenuOpened)}
					onMouseEnter={onHoverEnter(s.id)}
					onMouseLeave={onHoverLeave}
				>
					{s.subject[0]}
					<HoveredTitle show={s.id === hoverId}>{s.subject}</HoveredTitle>
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
				<ContextMenuItem onClick={onEditSubjectClick}>?????? ??????</ContextMenuItem>
				<ContextMenuItem alert onClick={onDeleteSubjectClick}>
					?????? ??????
				</ContextMenuItem>
			</ContextMenu>
			<Modal
				isOpen={isModalOpen}
				title="?????? ????????????????"
				onRequestClose={onClose}
				yesButtonText="??????"
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
				title="?????? ????????? ??????????????? ??????????"
				onRequestClose={onEditSubjectClose}
				yesButtonText="??????"
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

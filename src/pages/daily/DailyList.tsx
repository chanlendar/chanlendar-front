import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

import { deleteDailyTask, finishTask, getTasksByMonth } from "@/apis/tasks";
import useStores from "@/hooks/useStore";
import useContextMenu from "@/hooks/useContextMenu";
import DailyItem from "@/pages/daily/DailyItem";
import CreationInput from "@/pages/daily/CreationInput";
import ContextMenu from "@/components/contextMenu/ContextMenu";
import ContextMenuItem from "@/components/contextMenu/ContextMenuItem";

interface Props {
	creationMode: boolean;
	setCreationMode: Dispatch<SetStateAction<boolean>>;
}

const DailyList: React.FC<Props> = ({ creationMode, setCreationMode }) => {
	const { subjectStore } = useStores();

	useEffect(() => {
		if (!subjectStore.hasDatesToTasks) {
			subjectStore.createSubjectsToDates();
		}
		if (!subjectStore.hasDailyList) {
			(async () => {
				subjectStore.createTasksFrom(
					await getTasksByMonth(subjectStore.currentSubjectId, subjectStore.selectedDate),
				);
			})();
		}
	}, [subjectStore.hasDatesToTasks, subjectStore.hasDailyList]);

	const [contextMenu, _, onContextMenu, closeContextMenu] = useContextMenu();

	const [taskId, setId] = useState("");
	const onChangeIdWhenContextMenuOpened = (id: string) => {
		setId(id);
		setTaskModifyMode(false);
	};

	const onContextMenuClose = () => {
		closeContextMenu();
	};

	const onTaskModifyClick = () => {
		setTaskModifyMode(true);
		onContextMenuClose();
	};

	const onTaskDeleteClick = async () => {
		await deleteDailyTask(subjectStore.currentSubjectId, taskId);
		subjectStore.deleteTask(taskId);
		onContextMenuClose();
	};

	const onTaskFinishClick = (taskId: string, finished: boolean) => async () => {
		await finishTask(subjectStore.currentSubjectId, taskId, finished);
		subjectStore.finishTask(taskId, finished);
	};

	const [taskModifyMode, setTaskModifyMode] = useState(false);

	return (
		<Layout>
			<Title>{subjectStore.currentSubject?.subject}</Title>
			<List>
				<>
					{creationMode && <CreationInput command="ADD" setMode={setCreationMode} />}
					{subjectStore.dailyList.map(
						({ id, task, finished, date, createdAt, updatedAt }) => (
							<DailyItem
								key={id}
								taskId={id}
								finished={finished}
								onContextMenu={onContextMenu(id, onChangeIdWhenContextMenuOpened)}
								taskModifyMode={taskModifyMode && taskId === id}
								setTaskModifyMode={setTaskModifyMode}
								onClick={onTaskFinishClick(id, !finished)}
							>
								{task}
							</DailyItem>
						),
					)}
					<ContextMenu
						show={contextMenu.show}
						x={contextMenu.x}
						y={contextMenu.y}
						closeContextMenu={onContextMenuClose}
						closeIfOutsideClicked
					>
						<ContextMenuItem onClick={onTaskModifyClick}>변경</ContextMenuItem>
						<ContextMenuItem alert onClick={onTaskDeleteClick}>
							삭제
						</ContextMenuItem>
					</ContextMenu>
				</>
			</List>
		</Layout>
	);
};

const Layout = styled.div`
	padding: 20px 20px;

	max-width: 380px;
	width: 380px;
	max-height: 620px;
	background-color: ${({ theme }) => theme.daily.list.backgroundColor};
	box-shadow: ${({ theme }) => theme.daily.list.boxShadow};

	border-radius: 6px;
`;

const Title = styled.div`
	font-size: 20px;
	font-weight: 700;
	line-height: 24px;

	margin-bottom: 40px;

	color: ${({ theme }) => theme.daily.list.titleColor};
`;

const List = styled.div`
	/*
	데일리 리스트 width =
	100% + 스크롤바 width(16px)
	좌, 우 padding 조심하기
	*/
	width: calc(100% + 16px);
	/* 
	데일리 리스트 max-height =
	데일리 리스트 max-height(620px) - 
	(상하 padding + 타이틀 height + 타이틀 margin-bottom)
	*/
	max-height: 516px;

	overflow: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: auto;

	&::-webkit-scrollbar {
		background-color: transparent;
		width: 16px;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #babac0;
		border-radius: 16px;
		border: 6px solid ${({ theme }) => theme.daily.list.backgroundColor};
	}

	&::-webkit-scrollbar-button {
		display: none;
	}

	& > div,
	input {
		margin-bottom: 16px;
	}
`;

export default observer(DailyList);

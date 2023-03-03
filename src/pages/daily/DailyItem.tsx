import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { observer } from "mobx-react-lite";

import CreationInput from "@/pages/daily/CreationInput";

interface Props {
	setTaskModifyMode: Dispatch<SetStateAction<boolean>>;
	onContextMenu?: (e: MouseEvent<HTMLDivElement>) => void;
	onClick: VoidFunction;
	taskModifyMode: boolean;
	finished: boolean;
	taskId: string;
}

const DailyItem = ({
	children,
	setTaskModifyMode,
	onContextMenu,
	onClick,
	taskModifyMode,
	finished,
	taskId,
}: React.PropsWithChildren<Props>) => {
	const theme = useTheme();
	const borderColor = finished
		? theme.daily.item.finishedColor
		: theme.daily.item.borderColor;
	const color = finished ? theme.daily.item.finishedColor : theme.daily.item.color;
	const textDecoration = finished ? "line-through" : "none";

	if (taskModifyMode)
		return <CreationInput taskId={taskId} command="MODIFY" setMode={setTaskModifyMode} />;
	return (
		<Item
			borderColor={borderColor}
			color={color}
			textDecoration={textDecoration}
			onContextMenu={onContextMenu}
			onClick={onClick}
		>
			{children}
		</Item>
	);
};

const Item = styled.div<{
	borderColor: string;
	color: string;
	textDecoration: string;
}>`
	padding: 10px;
	max-width: 340px;
	width: 340px;

	border: 1px solid ${({ borderColor }) => borderColor};
	border-radius: 4px;

	color: ${({ color }) => color};
	font-size: 16px;
	text-decoration: ${({ textDecoration }) => textDecoration};
	cursor: pointer;
`;

export default observer(DailyItem);

import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import useInput from "@/hooks/useInput";
import useStores from "@/hooks/useStore";
import useCookie from "@/hooks/useCookie";

import { addDailyTask, modifyDailyTask } from "@/apis/dailies";

interface Props {
	command: "ADD" | "MODIFY";
	taskId?: string;
	setMode: Dispatch<SetStateAction<boolean>>;
}

const CreationInput: React.FC<Props> = ({ setMode, command, taskId }) => {
	const theme = useTheme();
	const borderColor = theme.daily.item.borderColor;
	const color = theme.daily.item.color;
	const textDecoration = "none";

	const [input, setInput, onChange] = useInput();
	const ref = useRef<HTMLInputElement>(null);
	const [getCookie] = useCookie();
	const { subjectStore, dailyStore, calendarStore } = useStores();

	useEffect(() => {
		if (ref.current) ref.current.focus();
	}, [ref.current]);

	const onKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && input !== "") {
			if (command === "ADD") {
				const result = await addDailyTask(
					subjectStore.subject.id,
					calendarStore.selectedDay.unix(),
					input,
				);
				dailyStore.addTask(result.id, result.task);
			} else if (command === "MODIFY") {
				await modifyDailyTask(subjectStore.subject.id, taskId!, input);
				dailyStore.modifyTask(taskId!, input);
				setMode(false);
			}
			setInput("");
		} else if (e.key === "Escape") {
			e.preventDefault();
			setInput("");
			setMode(false);
		}
	};

	return (
		<StyledInput
			borderColor={borderColor}
			color={color}
			textDecoration={textDecoration}
			value={input}
			onChange={onChange}
			onKeyDown={onKeyDown}
			ref={ref}
		/>
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

const Input = Item.withComponent("input");
const StyledInput = styled(Input)`
	background-color: transparent;

	&:focus {
		outline: none;
	}
`;

export default CreationInput;

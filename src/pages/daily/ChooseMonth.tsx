import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import useStores from "@/hooks/useStore";

interface Props {
	onClose: VoidFunction;
}

const ChooseMonth: React.FC<Props> = ({ onClose }) => {
	const { calendarStore } = useStores();

	const onMonthClick = (month: number) => () => {
		calendarStore.changeMonth(month);
		onClose();
	};

	return (
		<div
			css={css`
				width: 100%;
				height: calc(100% - 40px);

				display: grid;
				grid-template-rows: repeat(3, 1fr);
				grid-template-columns: repeat(4, 1fr);
				cursor: pointer;
			`}
		>
			{Array(12)
				.fill(null)
				.map((_, i) => {
					return (
						<Month key={i} onClick={onMonthClick(i)}>
							{i + 1}월
						</Month>
					);
				})}
		</div>
	);
};

const Month = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.daily.calendar.item.text};
	font-weight: bold;
	font-size: 14px;
`;

export default ChooseMonth;

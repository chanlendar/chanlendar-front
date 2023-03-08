import { css } from "@emotion/react";
import styled from "@emotion/styled";

import useStores from "@/hooks/useStore";
import { observer } from "mobx-react";

interface Props {
	onClose: VoidFunction;
}

const ChooseYear: React.FC<Props> = ({ onClose }) => {
	const { subjectStore } = useStores();
	const onYearClick = (year: number) => () => {
		subjectStore.changeYear(year);
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
			{subjectStore.yearsToChoose.map((year) => (
				<Year key={year} onClick={onYearClick(year)}>
					{year}
				</Year>
			))}
		</div>
	);
};

const Year = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme }) => theme.daily.calendar.item.text};
	font-weight: bold;
	font-size: 14px;
`;

export default observer(ChooseYear);

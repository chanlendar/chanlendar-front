import { ReactNode } from "react";
import { css } from "@emotion/react";

interface Props {
	Icon: ReactNode;
	onClick: VoidFunction;
}

const CalendarHeaderIcon: React.FC<Props> = ({ Icon, onClick }) => {
	return (
		<div
			css={css`
				width: 40px;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
			`}
			onClick={onClick}
		>
			{Icon}
		</div>
	);
};

export default CalendarHeaderIcon;

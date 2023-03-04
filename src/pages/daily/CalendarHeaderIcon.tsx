import { ReactNode } from "react";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
	Icon: ReactNode;
}

const CalendarHeaderIcon: React.FC<Props> = ({ Icon }) => {
	return (
		<div
			css={css`
				width: 40px;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
			`}
		>
			{Icon}
		</div>
	);
};

export default CalendarHeaderIcon;

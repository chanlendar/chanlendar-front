import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {}

const Calendar: React.FC<Props> = () => {
	const theme = useTheme();

	return (
		<div
			css={css`
				max-width: 420px;
				width: 420px;
				max-height: 280px;
				height: 280px;

				border-radius: 6px;
				background-color: ${theme.daily.calendar.backgroundColor};
				box-shadow: ${theme.daily.calendar.boxShadow};
			`}
		>
			I'm Calendar
		</div>
	);
};

export default Calendar;

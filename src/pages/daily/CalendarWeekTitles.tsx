import { css, Theme } from "@emotion/react";

interface Props {}

const CalendarWeekTitles: React.FC<Props> = () => {
	return (
		<div
			css={css`
				height: 40px;
				display: grid;
				grid-template-columns: repeat(7, 1fr);
			`}
		>
			<div css={[baseStyles, redTextStyle]}>일</div>
			<div css={baseStyles}>월</div>
			<div css={baseStyles}>화</div>
			<div css={baseStyles}>수</div>
			<div css={baseStyles}>목</div>
			<div css={baseStyles}>금</div>
			<div css={[baseStyles, blueTextStyle]}>토</div>
		</div>
	);
};

const baseStyles = (theme: Theme) => css`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${theme.daily.calendar.item.text};
`;

const redTextStyle = () => css`
	color: #f44336;
`;
const blueTextStyle = () => css`
	color: #2979ff;
`;

export default CalendarWeekTitles;

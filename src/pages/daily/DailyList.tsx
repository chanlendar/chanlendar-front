import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import DailyItem from "@/pages/daily/DailyItem";

interface Props {}

const DailyList: React.FC<Props> = () => {
	const theme = useTheme();

	return (
		<div
			css={css`
				padding: 20px 20px;

				max-width: 380px;
				width: 380px;
				max-height: 620px;

				background-color: ${theme.daily.list.backgroundColor};
				box-shadow: ${theme.daily.list.boxShadow};

				border-radius: 6px;
			`}
		>
			<div
				css={css`
					font-size: 20px;
					font-weight: 700;
					line-height: 24px;

					margin-bottom: 40px;

					color: ${theme.daily.list.titleColor};
				`}
			>
				Title
			</div>
			<div
				css={css`
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
						border: 6px solid ${theme.daily.list.backgroundColor};
					}

					&::-webkit-scrollbar-button {
						display: none;
					}

					& > div {
						margin-bottom: 16px;
					}
				`}
			>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
				<DailyItem>asdf</DailyItem>
			</div>
		</div>
	);
};

export default DailyList;

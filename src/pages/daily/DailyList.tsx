import { css, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import DailyItem from "@/pages/daily/DailyItem";
import ContextMenu from "@/components/ContextMenu";
import useContextMenu from "@/hooks/useContextMenu";

interface Props {}

const DailyList: React.FC<Props> = () => {
	const [contextMenu, _, onContextMenu, closeContextMenu] = useContextMenu();
	const theme = useTheme();
	return (
		<Layout>
			<Title>Title</Title>
			<List>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<DailyItem onContextMenu={onContextMenu}>asdf</DailyItem>
				<ContextMenu
					show={contextMenu.show}
					x={contextMenu.x}
					y={contextMenu.y}
					closeContextMenu={closeContextMenu}
					closeIfOutsideClicked
				>
					<ContextMenuItemContainer>
						<div css={[contextItemBaseStyles, changeNameStyles(theme)]}>변경</div>
						<div css={[contextItemBaseStyles, deleteSubjectStyles]}>삭제</div>
					</ContextMenuItemContainer>
				</ContextMenu>
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

	& > div {
		margin-bottom: 16px;
	}
`;

const ContextMenuItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 4px;

	border: 1px solid ${({ theme }) => theme.sidebar.contextMenu.borderColor};

	& > div:not(:first) {
		border-top: 1px solid ${({ theme }) => theme.sidebar.contextMenu.borderColor};
	}

	background-color: ${({ theme }) => theme.sidebar.contextMenu.backgroundColor};
	user-select: none;
	cursor: pointer;
`;

const contextItemBaseStyles = css`
	padding: 10px;
	font-weight: bold;
	font-size: 14px;
`;

const changeNameStyles = (theme: Theme) => css`
	color: ${theme.sidebar.contextMenu.changeNameColor};
`;

const deleteSubjectStyles = css`
	color: #e53935;
`;

export default DailyList;

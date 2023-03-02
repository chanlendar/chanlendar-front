import styled from "@emotion/styled";
import DailyBackground from "@/pages/daily/DailyBackground";
import { ReactNode } from "react";

interface Props {
	Sidebar: ReactNode;
	Button: ReactNode;
	DailyList: ReactNode;
	Calendar: ReactNode;
}

const Layout: React.FC<Props> = ({ Sidebar, Button, DailyList, Calendar }) => {
	return (
		<Flex>
			{Sidebar}
			<DailyBackground>
				<PageLayout>
					<ContentLayout>
						<ButtonLayout>{Button}</ButtonLayout>
						<ListAndCalendarLayout>
							{DailyList}
							{Calendar}
						</ListAndCalendarLayout>
					</ContentLayout>
				</PageLayout>
			</DailyBackground>
		</Flex>
	);
};

const Flex = styled.div`
	display: flex;
`;

const PageLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
`;

const ContentLayout = styled.div`
	min-width: 870px;
	width: 870px;
`;

const ButtonLayout = styled.div`
	margin-bottom: 18px;
`;

const ListAndCalendarLayout = styled.div`
	display: flex;
	justify-content: space-between;
`;

export default Layout;

import styled from "@emotion/styled";

import FlexWithSidebar from "@/components/sidebar/FlexWithSidebar";
import DailyBackground from "@/pages/daily/DailyBackground";

interface Props {}

const Empty = ({ children }: React.PropsWithChildren<Props>) => {
	return (
		<FlexWithSidebar>
			<DailyBackground>
				<CenterText>{children}</CenterText>
			</DailyBackground>
		</FlexWithSidebar>
	);
};

const CenterText = styled.div`
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	color: ${({ theme }) => theme.daily.item.color};
	font-size: 24px;
`;

export default Empty;

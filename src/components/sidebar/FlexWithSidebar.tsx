import styled from "@emotion/styled";

import Sidebar from "@/components/sidebar/Sidebar";

interface Props {}

const FlexWithSidebar = ({ children }: React.PropsWithChildren<Props>) => {
	return (
		<Flex>
			<Sidebar />
			{children}
		</Flex>
	);
};

const Flex = styled.div`
	display: flex;
`;

export default FlexWithSidebar;

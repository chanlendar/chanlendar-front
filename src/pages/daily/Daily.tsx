import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Sidebar from "@/components/sidebar/Sidebar";

interface Props {}

const Daily: React.FC<Props> = () => {
	return (
		<Flex>
			<Sidebar />
			<div>daily</div>
		</Flex>
	);
};

const Flex = styled.div`
	display: flex;
`;

export default Daily;

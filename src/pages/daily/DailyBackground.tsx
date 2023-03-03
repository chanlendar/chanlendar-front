import styled from "@emotion/styled";

import Page from "@/components/Page";

const Background = styled(Page)`
	width: calc(100% - 72px);
	height: auto;
	background-color: ${({ theme }) => theme.daily.backgroundColor};
`;

export default Background;

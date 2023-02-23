import styled from "@emotion/styled";

const Page = styled.div`
	height: calc(100% - 56px);
	background-color: ${({ theme }) => theme.body.backgroundColor};
`;

export default Page;

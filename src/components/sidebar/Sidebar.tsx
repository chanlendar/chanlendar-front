import styled from "@emotion/styled";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { observer } from "mobx-react-lite";

import Subjects from "@/components/sidebar/Subjects";

import useStores from "@/hooks/useStore";
import { getUserSubjects } from "@/apis/subjects";

interface Props {}

const Sidebar: React.FC<Props> = () => {
	const [cookies] = useCookies(["user"]);
	const { subjectStore } = useStores();
	useEffect(() => {
		if (subjectStore.empty) {
			getUserSubjects(cookies["user"]?.uid).then((r) => {
				subjectStore.getSubjectsFromQuerySnapshot(r);
				console.log("ㅎㅇ");
			});
		}
	}, []);

	return (
		<Container>
			<Subjects />
		</Container>
	);
};

const Container = styled.ul`
	display: flex;
	flex-direction: column;

	width: 72px;
	height: calc(100vh - 56px);
	background-color: ${({ theme }) => theme.sidebar.backgroundColor};
	overflow-y: auto;
	padding: 0px 12px;

	justify-items: center;

	& > li {
		margin-top: 12px;
	}
`;

export default observer(Sidebar);

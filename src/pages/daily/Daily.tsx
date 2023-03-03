import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Button from "@/components/Button";

import Empty from "@/pages/daily/Empty";
import Layout from "@/pages/daily/Layout";
import DailyList from "@/pages/daily/DailyList";
import Calendar from "@/pages/daily/Calendar";

import useStores from "@/hooks/useStore";

interface Props {}

const Daily: React.FC<Props> = () => {
	const { subjectStore, dailyStore } = useStores();

	const [creationMode, setCreationMode] = useState(false);

	const onButtonClick = () => {
		setCreationMode(true);
	};

	useEffect(() => {
		if (subjectStore.subject.id !== "") {
			dailyStore.initializeBySubject(subjectStore.subject.id);
		}
	}, [subjectStore.subject.id]);

	if (subjectStore.subject.id === "")
		return <Empty>주제를 생성하거나, 눌러서 관리를 시작하세요!</Empty>;

	return (
		<Layout
			Button={
				<Button border onClick={onButtonClick}>
					생성
				</Button>
			}
			DailyList={
				<DailyList creationMode={creationMode} setCreationMode={setCreationMode} />
			}
			Calendar={<Calendar />}
		/>
	);
};

export default observer(Daily);

import { observer } from "mobx-react-lite";
import Button from "@/components/Button";

import Empty from "@/pages/daily/Empty";
import Layout from "@/pages/daily/Layout";
import DailyList from "@/pages/daily/DailyList";
import Calendar from "@/pages/daily/Calendar";

import useStores from "@/hooks/useStore";

interface Props {}

const Daily: React.FC<Props> = () => {
	const { dailyStore } = useStores();

	if (dailyStore.subjectId === "")
		return <Empty>주제를 생성하거나, 눌러서 관리를 시작하세요!</Empty>;

	return (
		<Layout
			Button={<Button border>생성</Button>}
			DailyList={<DailyList />}
			Calendar={<Calendar />}
		/>
	);
};

export default observer(Daily);

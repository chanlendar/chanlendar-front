import Button from "@/components/Button";
import Sidebar from "@/components/sidebar/Sidebar";
import Layout from "@/pages/daily/Layout";
import DailyList from "@/pages/daily/DailyList";
import Calendar from "@/pages/daily/Calendar";

interface Props {}

const Daily: React.FC<Props> = () => {
	return (
		<Layout
			Sidebar={<Sidebar />}
			Button={<Button border>생성</Button>}
			DailyList={<DailyList />}
			Calendar={<Calendar />}
		/>
	);
};

export default Daily;

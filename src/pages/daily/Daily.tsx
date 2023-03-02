import styled from "@emotion/styled";

import Sidebar from "@/components/sidebar/Sidebar";
import Layout from "@/pages/daily/Layout";
import DailyList from "@/pages/daily/DailyList";
import Calendar from "@/pages/daily/Calendar";

interface Props {}

const Daily: React.FC<Props> = () => {
	return (
		<Layout
			Sidebar={<Sidebar />}
			Button={<Button>asdf</Button>}
			DailyList={<DailyList />}
			Calendar={<Calendar />}
		/>
	);
};

const Button = styled.button``;

export default Daily;

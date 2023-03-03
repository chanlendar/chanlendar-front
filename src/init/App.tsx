// 모든 컴포넌트에서 스토어가 접근 가능해야되므로 App에 Mobx 프로바이더만 있음
import { Provider } from "mobx-react";

import Root from "@/init/Root";
import stores from "@/stores";

const App = () => {
	return (
		<Provider
			profileStore={stores.profileStore}
			themeStore={stores.themeStore}
			subjectStore={stores.subjectStore}
			dailyStore={stores.dailyStore}
		>
			<Root />
		</Provider>
	);
};

export default App;

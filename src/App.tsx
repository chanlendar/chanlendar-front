import GlobalStyles from "@/GlobalStyles";
import { Outlet } from "react-router-dom";
import Header from "@/Header";

function App() {
	return (
		<>
			<GlobalStyles />
			<Header />
			<Outlet />
		</>
	);
}

export default App;

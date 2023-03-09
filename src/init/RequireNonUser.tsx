import { Navigate } from "react-router-dom";

import useCookie from "@/hooks/useCookie";

interface Props {}

const RequireNonUser = ({ children }: React.PropsWithChildren<Props>) => {
	const [getCookie] = useCookie();

	if (getCookie("user")) {
		return <Navigate to="/daily" replace />;
	}

	return children as JSX.Element;
};

export default RequireNonUser;

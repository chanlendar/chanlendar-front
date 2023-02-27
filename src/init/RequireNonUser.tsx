import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface Props {}

const RequireNonUser = ({ children }: React.PropsWithChildren<Props>) => {
	const [cookies] = useCookies(["user"]);

	if (cookies["user"]) {
		return <Navigate to="/" replace />;
	}

	return children as JSX.Element;
};

export default RequireNonUser;

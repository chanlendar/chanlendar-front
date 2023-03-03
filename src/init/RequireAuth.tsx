import { Navigate } from "react-router-dom";

import useCookie from "@/hooks/useCookie";
import useStores from "@/hooks/useStore";
import { hasNull } from "@/utils";

interface Props {}

const RequireAuth = ({ children }: React.PropsWithChildren<Props>) => {
	const { profileStore } = useStores();
	const [getCookie] = useCookie();

	if (!getCookie("user")) {
		return <Navigate to="/login" replace />;
	}

	const { email, name, uid } = getCookie("user");

	if (hasNull(email, name, uid)) {
		return <Navigate to="/login" replace />;
	}

	profileStore.setProfile(email, name, uid);

	return children as JSX.Element;
};

export default RequireAuth;

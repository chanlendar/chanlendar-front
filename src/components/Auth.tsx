import useStores from "@/hooks/useStore";
import { validateNull } from "@/utils";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface Props {}

const Auth = ({ children }: React.PropsWithChildren<Props>) => {
	const { profileStore } = useStores();
	const [cookies] = useCookies(["user"]);

	if (!cookies["user"]) {
		return <Navigate to="/login" replace />;
	}

	const { email, name, uid } = cookies["user"];

	if (!validateNull(email, name, uid)) {
		return <Navigate to="/login" replace />;
	}

	profileStore.setProfile(email, name, uid);

	return children as JSX.Element;
};

export default Auth;
